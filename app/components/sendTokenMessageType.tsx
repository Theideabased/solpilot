import { useChat } from "../providers/chatProvider";
import type { SendDetails } from "../types";
import { createChatMessage } from "../utils";

const SendTokenMessageType = ({
  text = "",
  executing,
  setExecuting,
  handleExit,
  send,
  solanaAddress,
  token,
}: {
  solanaAddress: string | null;
  text?: string;
  executing: boolean;
  setExecuting: (executing: boolean) => void;
  handleExit: () => void;
  send: SendDetails;
  token:string;
}) => {
  const { addMessage } = useChat();

  const confirmSend = async (sendDetails: SendDetails) => {
    try {
      if (solanaAddress === null) {
        addMessage(
          token,
          createChatMessage({
            sender: "ai",
            text: "Connect your Solana wallet before sending tokens.",
            type: "text",
          })
        );
        return;
      }
      setExecuting(true);
      addMessage(
        token,
        createChatMessage({
          sender: "ai",
          text: "Direct token transfers via SOLPILOT are coming soon. Please complete this transfer in your Solana wallet.",
          type: "text",
        })
      );
      setExecuting(false);
    } catch (error) {
      setExecuting(false);
      addMessage(token,
        createChatMessage({
          sender: "ai",
          text: `Transfer failed, Error : ${error}`,
          type: "text",
        })
      );

      return;
    }
  };

  return (
    <div className="p-3 rounded-xl bg-zinc-800 text-white max-w-[75%] ">
      <h3 className="text-lg font-semibold mb-2">Your Transfer Details</h3>
      <div>{text}</div>
      {!executing && (
        <div className=" space-x-4">
          <button
            type="button"
            onClick={handleExit}
            className="mt-3 px-4 py-2 bg-white text-red-700 font-semibold rounded-lg hover:bg-gray-300"
          >
            Exit
          </button>
          <button
            type="button"
            onClick={() => {
              if (send) {
                confirmSend(send);
              }
            }}
            className="mt-3 px-4 py-2 bg-white text-red-700 font-semibold rounded-lg hover:bg-gray-300"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default SendTokenMessageType;
