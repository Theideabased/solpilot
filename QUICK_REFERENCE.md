# 🚀 Quick Reference: Injective → Solana Migration

## API Endpoints

| Service | Injective | Solana |
|---------|-----------|--------|
| **Token List** | `https://raw.githubusercontent.com/InjectiveLabs/injective-lists/.../mainnet.json` | `https://token.jup.ag/all` |
| **Swap Quotes** | `https://swap.coinhall.org/v1/swap` | `https://quote-api.jup.ag/v6/quote` |
| **Token Prices** | Coinhall swap API | `https://price.jup.ag/v4/price?ids=MINT` |
| **Balances** | Injective IndexerGrpc API | Solana RPC `getBalance()` + `getParsedTokenAccountsByOwner()` |
| **Validators** | ChainGrpcStakingApi | Solana RPC `getVoteAccounts()` |
| **Metrics** | DeFiLlama (Injective filter) | DeFiLlama (Solana filter) |

## Code Patterns

### 1. Token Metadata
```typescript
// BEFORE (Injective)
const TOKEN_LIST_URL = "https://raw.githubusercontent.com/InjectiveLabs/injective-lists/.../mainnet.json";
const token = data.find(t => t.symbol === "INJ" || t.address === denom);

// AFTER (Solana)
const TOKEN_LIST_URL = "https://token.jup.ag/all";
const token = data.find(t => t.symbol === "SOL" && t.address === mintAddress);
```

### 2. Balance Fetching
```typescript
// BEFORE (Injective)
import { IndexerGrpcAccountPortfolioApi } from "@injectivelabs/sdk-ts";
const portfolio = await api.fetchAccountPortfolioBalances(injectiveAddress);
const cw20 = await api.fetchCW20BalancesNoThrow(injectiveAddress);

// AFTER (Solana)
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
const connection = new Connection("https://api.mainnet-beta.solana.com");
const solBalance = await connection.getBalance(publicKey);
const tokens = await connection.getParsedTokenAccountsByOwner(publicKey, {
  programId: TOKEN_PROGRAM_ID
});
```

### 3. Swap Quotes
```typescript
// BEFORE (Injective)
const res = await fetch(
  `https://swap.coinhall.org/v1/swap?chainId=injective-1&from=${from}&to=${to}&amount=${amount}&slippageBps=500`
);
const { minimumReceive, contractInput, route } = await res.json();

// AFTER (Solana)
const res = await fetch(
  `https://quote-api.jup.ag/v6/quote?inputMint=${from}&outputMint=${to}&amount=${amount}&slippageBps=50`
);
const quoteData = await res.json();
const outputAmount = quoteData.outAmount;
```

### 4. Token Prices
```typescript
// BEFORE (Injective)
// Complex swap-based price discovery through INJ

// AFTER (Solana)
const res = await fetch(`https://price.jup.ag/v4/price?ids=${mintAddress}`);
const data = await res.json();
const price = data.data[mintAddress].price; // Direct USD price
```

### 5. Address Validation
```typescript
// BEFORE (Injective)
function isValidInjectiveAddress(address: string): boolean {
  return /^inj1[a-z0-9]{38}$/.test(address);
}

// AFTER (Solana)
import { PublicKey } from "@solana/web3.js";
function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}
```

### 6. Validators
```typescript
// BEFORE (Injective)
import { ChainGrpcStakingApi } from "@injectivelabs/sdk-ts";
const api = new ChainGrpcStakingApi(endpoints.grpc);
const validators = await api.fetchValidators();

// AFTER (Solana)
import { Connection } from "@solana/web3.js";
const connection = new Connection("https://api.mainnet-beta.solana.com");
const voteAccounts = await connection.getVoteAccounts();
const validators = [...voteAccounts.current, ...voteAccounts.delinquent];
```

## Token Standards

| Feature | Injective | Solana |
|---------|-----------|--------|
| **Native Token** | INJ | SOL |
| **Token Standard** | CW20 + Bank Module | SPL Token (Token Program) |
| **Decimals** | Usually 18 | Usually 6-9 (SOL = 9) |
| **Address Format** | bech32 (`inj1...`) | base58 (43-44 chars) |
| **Token ID** | `denom` or `address` | `mint` address |

## Common Gotchas

1. **Decimals Changed**: INJ uses 18, SOL uses 9
   ```typescript
   // Injective
   const amount = value * 10**18;
   
   // Solana
   import { LAMPORTS_PER_SOL } from "@solana/web3.js";
   const amount = value * LAMPORTS_PER_SOL; // 10**9
   ```

2. **No CW20 on Solana**: All tokens are SPL tokens
   ```typescript
   // Injective has two types
   { bank: [...], cw20: [...] }
   
   // Solana has one type
   { bank: [...allTokens], cw20: [] }
   ```

3. **RPC Rate Limits**: Public Solana RPC is rate-limited
   - Use premium RPC (Helius, QuickNode) for production
   - Add delays between requests

4. **Token Metadata**: Jupiter's list uses different structure
   ```typescript
   // Injective
   { symbol, denom, address, decimals, logo }
   
   // Solana
   { symbol, address, decimals, logoURI }
   ```

## Testing Commands

```bash
# Install dependencies
npm install @solana/web3.js @solana/spl-token

# Run migration setup
./setup-solana-migration.sh

# Test in your app
# 1. "swap 1 SOL to USDC"
# 2. "show my balance"
# 3. "what is the price of SOL"
# 4. "show validators"
# 5. "show Solana metrics"
```

## Useful Links

- 🔗 Jupiter Docs: https://station.jup.ag/docs
- 🔗 Solana Web3.js: https://solana-labs.github.io/solana-web3.js/
- 🔗 SPL Token: https://spl.solana.com/token
- 🔗 Solana RPC: https://docs.solana.com/api/http
- 🔗 DeFiLlama: https://defillama.com/docs/api

## Package Versions

```json
{
  "@solana/web3.js": "^1.87.0",
  "@solana/spl-token": "^0.3.9",
  "axios": "^1.6.0",
  "bs58": "^5.0.0"
}
```

---

**Pro Tip**: Keep the original Injective code commented out for reference during migration!
