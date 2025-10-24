import axios from "axios";

export async function extractSwapDetails(message: string) {
  const regex = /swap (\d+(?:\.\d+)?) (\w+) to (\w+)/i;
  const match = message.match(regex);

  if (match) {
    const amount = parseFloat(match[1]);
    const from = match[2].toUpperCase();
    const fromMetaData = await fetchTokenMetadata(from);

    if (fromMetaData == "error") {
      const status = "failed_from";
      return { from: from, from_metadata: "", to: "", to_metadata: "", amount: 0, status: status };
    }
    const to = match[3].toUpperCase();
    const toMetaData = await fetchTokenMetadata(to);
    if (toMetaData == "error") {
      const status = "failed_to";
      return { from: "", from_metadata: "", to: to, to_metadata: "", amount: 0, status: status };
    }
    const status = "success";

    return {
      from: from,
      from_metadata: fromMetaData,
      to: to,
      to_metadata: toMetaData,
      amount: amount,
      status: status,
    }; 
  } else {
    const status = "failed";

    return { from: "", from_metadata: "", to: "", to_metadata: "", amount: 0, status: status }; 
  }
}

// Jupiter's token list - verified tokens on Solana
const TOKEN_LIST_URL = "https://token.jup.ag/all";

export const fetchTokenMetadata = async (ticker: string) => {
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

export const fetchSwapDetails = async (fromMetaData: any, amount: number, toMetaData: any) => {
  try {
    // Convert amount to smallest unit (lamports/token decimals)
    const inputAmount = Math.floor(amount * 10 ** fromMetaData.decimals);
    
    // Jupiter Quote API V6
    const quoteResponse = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=${fromMetaData.address}&outputMint=${toMetaData.address}&amount=${inputAmount}&slippageBps=50`
    );

    if (!quoteResponse.ok) {
      const msg = "❌ Failed to fetch swap quote";
      return { msg: msg, contract_input: "" };
    }

    const quoteData = await quoteResponse.json();

    if (!quoteData.outAmount) {
      const msg = "error_min";
      return { msg: msg, contract_input: "" };
    }

    const outputAmount = Number(quoteData.outAmount) / 10 ** toMetaData.decimals;
    const routeInfo = quoteData.routePlan?.[0]?.swapInfo?.label || "Jupiter";

    const msg = `Route: ${routeInfo} | Amount: ${amount} ${fromMetaData.symbol.toUpperCase()} ≈ ${outputAmount.toFixed(6)} ${toMetaData.symbol}`;

    // Return quote data for transaction construction
    return { msg: msg, contract_input: quoteData };
  } catch (error) {
    console.error("Swap error:", error);
    const msg = `❌ Failed to fetch swap routes.`;
    return { msg: msg, contract_input: "" };
  }
};

export async function validateTokens(from: string, to: string) {
  try {
    const response = await axios.get(TOKEN_LIST_URL);
    const tokens = response.data;

    const validFrom = tokens.some((token: any) => token.symbol.toUpperCase() === from);
    const validTo = tokens.some((token: any) => token.symbol.toUpperCase() === to);

    return validFrom && validTo;
  } catch (error) {
    return false;
  }
}
