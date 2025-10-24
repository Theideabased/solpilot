import { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

export type SolanaWalletType = "phantom" | "solflare";

export const connectToSolanaWallet = async (
  walletType: SolanaWalletType
): Promise<{ address: string | null; token: string | null }> => {
  try {
    let provider: any;

    // Get the wallet provider
    if (walletType === "phantom") {
      if (!window.phantom?.solana) {
        alert("Phantom wallet is not installed. Please install it and try again.");
        return { address: null, token: null };
      }
      provider = window.phantom.solana;
    } else if (walletType === "solflare") {
      if (!window.solflare) {
        alert("Solflare wallet is not installed. Please install it and try again.");
        return { address: null, token: null };
      }
      provider = window.solflare;
    } else {
      return { address: null, token: null };
    }

    // Connect to wallet
    let response;
    let address;
    
    // Check if already connected
    if (provider.isConnected && provider.publicKey) {
      address = provider.publicKey.toString();
    } else {
      // Disconnect any stale connection first
      try {
        await provider.disconnect();
      } catch (e) {
        // Ignore disconnect errors
      }
      
      // Wait a bit for cleanup
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Now connect fresh
      response = await provider.connect();
      address = response.publicKey.toString();
    }

    // Check if user exists
    const res = await fetch("/api/users", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json", 
        solanaAddress: address 
      },
    });

    const userData = await res.json();

    // If user doesn't exist, return address without token
    if (userData.data == null) {
      return { address, token: null };
    }

    // Get nonce for signing
    const nonceResponse = await fetch("/api/auth/nonce", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    });
    const { nonce } = await nonceResponse.json();

    // Sign message
    const { status, token } = await signMessage(provider, address, nonce);

    if (status === "success") {
      return { address, token };
    }

    return { address, token: null };
  } catch (error) {
    console.error(`Error connecting to ${walletType}:`, error);
    return { address: null, token: null };
  }
};

const signMessage = async (
  provider: any,
  address: string,
  nonce: string
): Promise<{ status: string; token: string | null }> => {
  try {
    // Create message to sign
    const message = `Sign this message to authenticate with SOLPILOT:\n\nNonce: ${nonce}`;
    const encodedMessage = new TextEncoder().encode(message);

    // Request signature from wallet
    const signedMessage = await provider.signMessage(encodedMessage, "utf8");
    
    // Convert signature to base58
    const signature = bs58.encode(signedMessage.signature);

    // Verify signature with backend
    const res = await fetch("/api/auth/verifyArbitrary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nonce, signature, address }),
    });

    const { isValid, token } = await res.json();

    if (isValid) {
      return { status: "success", token };
    }

    return { status: "failed", token: null };
  } catch (error) {
    console.error("Signing error:", error);
    return { status: "failed", token: null };
  }
};
