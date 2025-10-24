import axios from "axios";
import { PublicKey } from "@solana/web3.js";

export async function extractTransactionData(message: string) {
  const regex_send = /send (\d+(\.\d+)?)\s+([A-Z]+)\s+to\s+([a-zA-Z0-9]+)/;
  const regex_transfer = /transfer (\d+(\.\d+)?)\s+([A-Z]+)\s+to\s+([a-zA-Z0-9]+)/;

  const match_send = message.match(regex_send);
  const match_transfer = message.match(regex_transfer);
  let match;

  if (match_send) {
    match = match_send;
  } else {
    match = match_transfer;
  }

  if (match) {
    const amount = parseFloat(match[1]);
    const receiver = match[4];

    if (!isValidSolanaAddress(receiver)) {
      return { amount: 0, token: "", receiver: "", status: "fail_address" };
    }

    const token = match[3].toUpperCase();
    const tokenMetadata = await fetchTokenMetadata(token);
    if (tokenMetadata == "error") {
      return { amount: 0, token: "", receiver: "", status: "fail_token" };
    }

    return { amount: amount, token: tokenMetadata, receiver: receiver, status: "success" };
  } else {
    return { amount: 0, token: "", receiver: "", status: "fail_match" };
  }
}

function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

const TOKEN_LIST_URL = "https://token.jup.ag/all";

const fetchTokenMetadata = async (ticker: string) => {
  try {
    const response = await axios.get(TOKEN_LIST_URL);
    const tokenMetadata = response.data.find((token: any) => token.symbol === ticker);

    if (tokenMetadata === undefined) {
      return "error";
    } else {
      return tokenMetadata;
    }
  } catch (error) {
    return "error";
  }
};
