import { createInjectiveIfNotExists, getInjectiveAddress, createSolanaIfNotExists, getSolanaAddress } from "./utils";

export async function POST(req: Request) {
  const { type, injectiveAddress, wallet_address, referral_code } = await req.json();

  // Legacy Injective support
  if (type === "createInjective") {
    const { data, error } = await createInjectiveIfNotExists(injectiveAddress);
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ data }), { status: 200 });
  }

  // New Solana support
  if (wallet_address) {
    const { data, error } = await createSolanaIfNotExists(wallet_address, referral_code);
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ data }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
}

export async function GET(req: Request) {
  const injectiveAddress = req.headers.get("injectiveAddress");
  const solanaAddress = req.headers.get("solanaAddress");

  // Support both Injective and Solana
  if (solanaAddress) {
    const { data, error } = await getSolanaAddress(solanaAddress);
    if (error) {
      return new Response(JSON.stringify({ data }), { status: 500 });
    }
    return new Response(JSON.stringify({ data }), { status: 200 });
  }

  if (injectiveAddress) {
    const { data, error } = await getInjectiveAddress(injectiveAddress);
    if (error) {
      return new Response(JSON.stringify({ data }), { status: 500 });
    }
    return new Response(JSON.stringify({ data }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: "Missing address" }), { status: 400 });
}
