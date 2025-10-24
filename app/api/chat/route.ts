import { NextResponse } from "next/server";
import { processMastraMessage } from "@/app/services/mastraService";
import { createChatMessage } from "@/app/utils";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const chatHistory = body.chatHistory || [];
    const walletAddress = body.address || null;

    // Use Mastra multi-agent system
    const result = await processMastraMessage(body.message, chatHistory, walletAddress);

    if (!result.success) {
      return NextResponse.json(
        {
          messages: [
            createChatMessage({
              sender: "ai",
              text: result.response,
              type: "error",
              intent: "error",
            }),
          ],
        },
        { status: 200 }
      );
    }

    // Build response messages
    const newMessages: any[] = [];

    // Add tool results as separate messages if any
    if (result.toolResults && result.toolResults.length > 0) {
      for (const toolResult of result.toolResults) {
        if (toolResult.result?.success) {
          // Determine message type based on tool
          let messageType = "text";
          if (toolResult.tool.includes("balance")) messageType = "balance";
          if (toolResult.tool.includes("swap")) messageType = "swap";
          if (toolResult.tool.includes("validator")) messageType = "validators";
          if (toolResult.tool.includes("metrics")) messageType = "metrics";

          newMessages.push(
            createChatMessage({
              sender: result.agent || "ai",
              text: JSON.stringify(toolResult.result.data || toolResult.result, null, 2),
              type: messageType,
              intent: toolResult.tool,
            })
          );
        }
      }
    }

    // Add main AI response
    newMessages.push(
      createChatMessage({
        sender: result.agent || "ai",
        text: result.response || "I've processed your request.",
        type: "text",
        intent: "general",
      })
    );

    return NextResponse.json({ messages: newMessages });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        messages: [
          createChatMessage({
            sender: "ai",
            text: "Failed to process AI request. Please try again.",
            type: "error",
            intent: "error",
          }),
        ],
      },
      { status: 500 }
    );
  }
}
