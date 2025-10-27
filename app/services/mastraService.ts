"use server";
import { mastra } from '@/mastra';

/**
 * Process user message using Mastra agents
 * This replaces the old OpenRouter implementation with Mastra's multi-agent system
 */
export async function processMastraMessage(
  userMessage: string,
  chatHistory: any[],
  walletAddress: string | null
) {
  try {
    // Determine which agent to use based on message content
    let agentName: 'solpilot' | 'sonia' | 'zerion' = 'solpilot';
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Route to Sonia for token analysis
    if (lowerMessage.includes('token') && (lowerMessage.includes('analyze') || lowerMessage.includes('analysis'))) {
      agentName = 'sonia';
    }
    
    // Route to Zerion for research/news
    if (lowerMessage.includes('news') || lowerMessage.includes('research') || lowerMessage.includes('latest')) {
      agentName = 'zerion';
    }

    const agent = mastra.getAgent(agentName);

    // Build context from chat history
    const recentHistory = chatHistory.slice(-5).map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    }));

    // Add wallet context if available
    const contextualMessage = walletAddress
      ? `[User Wallet: ${walletAddress}]\n\n${userMessage}`
      : userMessage;

    // Generate response using Mastra
    const result = await agent.generate(contextualMessage, {
      maxSteps: 5,
      onStepFinish: (step: any) => {
        console.log(`✅ Step completed:`, step.text?.substring(0, 100));
      },
    });

    // Process tool results if any
    const toolResults: any[] = [];
    if (result.steps) {
      for (const step of result.steps as any[]) {
        if (step.toolCalls && step.toolCalls.length > 0) {
          for (let i = 0; i < step.toolCalls.length; i++) {
            const toolCall = step.toolCalls[i];
            const toolResult = step.toolResults?.[i];
            
            toolResults.push({
              tool: toolCall.toolName || 'unknown',
              args: toolCall.args,
              result: toolResult,
            });
          }
        }
      }
    }

    return {
      success: true,
      agent: agentName,
      response: result.text,
      toolResults,
      steps: result.steps?.length || 0,
    };
  } catch (error: any) {
    console.error('❌ Mastra Error:', error);
    return {
      success: false,
      error: error.message,
      response: 'Sorry, I encountered an error processing your request. Please try again.',
    };
  }
}

/**
 * Get specific agent for direct interaction
 */
export async function getAgent(agentName: 'solpilot' | 'sonia' | 'zerion') {
  return mastra.getAgent(agentName);
}
