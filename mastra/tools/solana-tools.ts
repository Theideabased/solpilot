import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import axios from 'axios';

// Initialize Solana connection
const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.devnet.solana.com';
const connection = new Connection(SOLANA_RPC);

export function createSolanaTools() {
  return {
    fetchBalance: createTool({
      id: 'fetch-balance',
      description: 'Fetches SOL and SPL token balances for a Solana wallet address',
      inputSchema: z.object({
        address: z.string().describe('Solana wallet address (base58 format)'),
      }),
      execute: async ({ context }) => {
        try {
          const { address } = context;
          const publicKey = new PublicKey(address);

          // Fetch SOL balance
          const balance = await connection.getBalance(publicKey);
          const solBalance = balance / LAMPORTS_PER_SOL;

          // Fetch SPL token accounts
          const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
            programId: TOKEN_PROGRAM_ID,
          });

          const tokens = tokenAccounts.value
            .filter((account) => {
              const amount = account.account.data.parsed.info.tokenAmount.uiAmount;
              return amount && amount > 0;
            })
            .map((account) => {
              const info = account.account.data.parsed.info;
              return {
                mint: info.mint,
                amount: info.tokenAmount.uiAmount,
                decimals: info.tokenAmount.decimals,
              };
            });

          return {
            success: true,
            data: {
              address,
              solBalance,
              tokens,
              tokenCount: tokens.length,
            },
          };
        } catch (error: any) {
          return {
            success: false,
            error: error.message || 'Failed to fetch balance',
          };
        }
      },
    }),

    fetchTokenPrice: createTool({
      id: 'fetch-token-price',
      description: 'Fetches current price for Solana tokens using Jupiter Price API',
      inputSchema: z.object({
        tokenAddress: z.string().describe('Token mint address'),
      }),
      execute: async ({ context }) => {
        try {
          const { tokenAddress } = context;
          const response = await axios.get(
            `https://price.jup.ag/v4/price?ids=${tokenAddress}`
          );

          const priceData = response.data.data[tokenAddress];
          
          if (!priceData) {
            return {
              success: false,
              error: 'Token not found or price unavailable',
            };
          }

          return {
            success: true,
            data: {
              tokenAddress,
              price: priceData.price,
              confidence: priceData.confidence,
              timestamp: new Date().toISOString(),
            },
          };
        } catch (error: any) {
          return {
            success: false,
            error: error.message || 'Failed to fetch token price',
          };
        }
      },
    }),

    fetchSwapQuote: createTool({
      id: 'fetch-swap-quote',
      description: 'Gets a swap quote from Jupiter Aggregator for token swaps',
      inputSchema: z.object({
        inputMint: z.string().describe('Input token mint address'),
        outputMint: z.string().describe('Output token mint address'),
        amount: z.number().describe('Amount to swap (in token units)'),
        slippageBps: z.number().optional().describe('Slippage tolerance in basis points (default: 50 = 0.5%)'),
      }),
      execute: async ({ context }) => {
        try {
          const { inputMint, outputMint, amount, slippageBps = 50 } = context;
          
          // Convert amount to lamports/smallest unit (assuming 6 decimals for most tokens)
          const amountInSmallestUnit = Math.floor(amount * 1000000);

          const response = await axios.get('https://quote-api.jup.ag/v6/quote', {
            params: {
              inputMint,
              outputMint,
              amount: amountInSmallestUnit,
              slippageBps,
            },
          });

          const quote = response.data;

          return {
            success: true,
            data: {
              inputMint,
              outputMint,
              inAmount: quote.inAmount,
              outAmount: quote.outAmount,
              priceImpactPct: quote.priceImpactPct,
              route: quote.routePlan?.map((plan: any) => plan.swapInfo.label).join(' → '),
            },
          };
        } catch (error: any) {
          return {
            success: false,
            error: error.message || 'Failed to fetch swap quote',
          };
        }
      },
    }),

    fetchValidators: createTool({
      id: 'fetch-validators',
      description: 'Fetches active Solana validators for staking',
      inputSchema: z.object({
        limit: z.number().optional().describe('Number of validators to return (default: 10)'),
      }),
      execute: async ({ context }) => {
        try {
          const { limit = 10 } = context;
          const voteAccounts = await connection.getVoteAccounts();

          const validators = voteAccounts.current
            .sort((a, b) => b.activatedStake - a.activatedStake)
            .slice(0, limit)
            .map((validator) => ({
              votePubkey: validator.votePubkey,
              nodePubkey: validator.nodePubkey,
              commission: validator.commission,
              activatedStake: validator.activatedStake / LAMPORTS_PER_SOL,
              lastVote: validator.lastVote,
            }));

          return {
            success: true,
            data: {
              validators,
              totalValidators: voteAccounts.current.length,
              delinquentValidators: voteAccounts.delinquent.length,
            },
          };
        } catch (error: any) {
          return {
            success: false,
            error: error.message || 'Failed to fetch validators',
          };
        }
      },
    }),

    fetchMetrics: createTool({
      id: 'fetch-metrics',
      description: 'Fetches Solana network metrics including TVL from DeFiLlama',
      inputSchema: z.object({
        metric: z.enum(['tvl', 'all']).optional().describe('Specific metric to fetch (default: all)'),
      }),
      execute: async ({ context }) => {
        try {
          // Fetch from DeFiLlama
          const response = await axios.get('https://api.llama.fi/v2/chains');
          const solanaData = response.data.find((chain: any) => chain.name === 'Solana');

          if (!solanaData) {
            return {
              success: false,
              error: 'Solana metrics not found',
            };
          }

          return {
            success: true,
            data: {
              chain: 'Solana',
              tvl: solanaData.tvl,
              tokenSymbol: solanaData.tokenSymbol,
              cmcId: solanaData.cmcId,
              gecko_id: solanaData.gecko_id,
              timestamp: new Date().toISOString(),
            },
          };
        } catch (error: any) {
          return {
            success: false,
            error: error.message || 'Failed to fetch metrics',
          };
        }
      },
    }),
  };
}
