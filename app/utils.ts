import type { ChatMessage } from "./types";

export const createChatMessage = ({
  sender,
  text = "No response from AI, try again.",
  type,
  balances = null,
  validators = null,
  contractInput = null,
  send = null,
  intent = null,
  pie = null,
  token_metadata = null,
  llama = null,
  stake_info = null,
  proposals = null,
}: ChatMessage): ChatMessage => {
  return {
    sender,
    text,
    type,
    intent,
    balances,
    validators,
    contractInput,
    token_metadata,
    pie,
    send,
    llama,
    stake_info,
    proposals,
  };
};
