# 🌐 Network Configuration Guide: Devnet vs Mainnet

## Current Status: You're on DEVNET ⚠️

```bash
NEXT_PUBLIC_SOLANA_RPC=https://api.devnet.solana.com
```

### Why Swap Failed for SOL → NOS

**Problem**: Jupiter swaps and NOS token **only work on MAINNET**

| Feature | Devnet | Mainnet |
|---------|--------|---------|
| Test with fake SOL | ✅ Yes | ❌ No (real money) |
| Jupiter swaps | ❌ No | ✅ Yes |
| NOS token exists | ❌ No | ✅ Yes |
| Real token prices | ❌ No | ✅ Yes |
| Token transfers | ✅ Yes (test) | ✅ Yes (real) |
| Airdrops | ✅ Yes (free test SOL) | ❌ No |

## 🧪 Option 1: Stay on DEVNET (For Testing)

### Best For:
- Testing wallet connections
- Testing UI flows
- Learning Solana without risk
- Getting free test SOL via airdrops

### What Works:
✅ Wallet connection  
✅ Balance checks  
✅ SOL transfers (test tokens)  
✅ SPL token creation/transfers  
✅ Network metrics  
✅ Validator info  

### What DOESN'T Work:
❌ Real token swaps (Jupiter)  
❌ Real token prices (most tokens don't exist)  
❌ NOS token (doesn't exist on devnet)  
❌ Most DeFi protocols  

### How to Get Test SOL on Devnet:

```bash
# Method 1: Using Solana CLI
solana airdrop 2 YOUR_WALLET_ADDRESS --url devnet

# Method 2: Using Phantom Wallet
# 1. Go to Settings → Developer Settings
# 2. Toggle "Testnet Mode" ON
# 3. Switch network to "Devnet"
# 4. Click "Airdrop" button (gets you 1 SOL)

# Method 3: Web Faucet
# Visit: https://faucet.solana.com
```

### Current Configuration:
```bash
# .env.local
NEXT_PUBLIC_SOLANA_RPC=https://api.devnet.solana.com  # Keep this for devnet
```

---

## 💰 Option 2: Switch to MAINNET (For Real Operations)

### Best For:
- Real token swaps
- Accessing all tokens (SOL, USDC, NOS, BONK, etc.)
- Production use
- Real DeFi operations

### What Works:
✅ Everything from devnet, PLUS:  
✅ Real Jupiter swaps  
✅ Real token prices  
✅ NOS token swaps  
✅ All mainnet DeFi protocols  

### What to Consider:
⚠️ **Uses REAL money** (you need real SOL)  
⚠️ Transaction fees (~0.000005 SOL per transaction)  
⚠️ Mistakes cost real funds  
⚠️ No free airdrops  

### How to Switch to Mainnet:

#### Step 1: Update .env.local

```bash
# Option A: Use free public RPC (slower, rate limited)
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com

# Option B: Use Helius (faster, recommended)
# Get free API key: https://helius.dev
NEXT_PUBLIC_SOLANA_RPC=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY

# Option C: Use QuickNode (professional)
# Get API key: https://quicknode.com
NEXT_PUBLIC_SOLANA_RPC=https://YOUR-ENDPOINT.solana-mainnet.quiknode.pro/YOUR_KEY/
```

#### Step 2: Restart Server

```bash
npm run dev
```

#### Step 3: Get Real SOL

**Buy SOL from exchanges:**
- Coinbase
- Binance
- Kraken
- FTX
- Phantom Wallet (built-in buy)

**Or receive from another wallet:**
- Ask someone to send you SOL
- Transfer from exchange to your Phantom wallet

**Minimum recommended:** 0.1 SOL (~$20) for testing swaps

#### Step 4: Switch Phantom Wallet to Mainnet

1. Open Phantom Wallet
2. Go to Settings ⚙️
3. Developer Settings (if in testnet mode, turn OFF)
4. Ensure you're on "Mainnet Beta"
5. Your wallet address stays the same!

---

## 🎯 Recommended Setup for You

Based on your needs, here's what I recommend:

### Phase 1: Test on DEVNET (Current Setup) ✅

**Do This:**
1. Keep devnet configuration
2. Get free test SOL via airdrop
3. Test these features:
   - Wallet connection ✅
   - Balance checking ✅
   - SOL transfers ✅
   - Create test SPL tokens ✅
   - Network queries ✅

**Skip These (won't work on devnet):**
- Token swaps (Jupiter)
- NOS token operations
- Real market prices

### Phase 2: Switch to MAINNET

**When ready for real operations:**
1. Update RPC to mainnet
2. Get small amount of real SOL (0.1 SOL minimum)
3. Test with tiny amounts first!
4. Then do real swaps

---

## 🔧 Quick Commands

### Get Devnet Test SOL

```bash
# Using Solana CLI (if installed)
solana airdrop 2 YOUR_ADDRESS --url devnet

# Check balance
solana balance YOUR_ADDRESS --url devnet
```

### Install Solana CLI (Optional)

```bash
# Linux/Mac
sh -c "$(curl -sSfL https://release.solana.com/v1.18.0/install)"

# Verify
solana --version
```

### Check Current Network in Your App

```bash
# See what network you're connected to
grep NEXT_PUBLIC_SOLANA_RPC .env.local
```

---

## 🧪 Testing Your Current DEVNET Setup

Try these queries that WORK on devnet:

### 1. Check Your Balance
```
User: "What's my balance?"
Expected: Shows your devnet SOL balance (probably 0 if no airdrop yet)
```

### 2. Get Network Info
```
User: "Show me Solana network metrics"
Expected: Shows TPS, validators, etc.
```

### 3. Get Validators
```
User: "Show me top validators"
Expected: Lists active Solana validators
```

### 4. Transfer Test SOL (after airdrop)
```
User: "Transfer 0.1 SOL to [another address]"
Expected: Transfers test SOL
```

### What WON'T Work (Mainnet Only)

```
❌ "Swap SOL to NOS" → NOS doesn't exist on devnet
❌ "What's BONK price?" → BONK doesn't exist on devnet
❌ "Show me Jupiter pools" → Jupiter is mainnet only
```

---

## 📊 Quick Reference Table

| Task | Devnet | Mainnet | How to Get |
|------|--------|---------|------------|
| Test SOL | ✅ Free airdrop | ❌ Must buy | `solana airdrop 2` (devnet) |
| Real SOL | ❌ | ✅ Purchase | Buy from exchange |
| Swaps | ❌ | ✅ Jupiter works | Need mainnet + real SOL |
| Your wallet | ✅ Same address | ✅ Same address | Already have it |
| Transaction fees | ✅ ~0.000005 test SOL | ✅ ~0.000005 real SOL | Very cheap! |

---

## 🚀 My Recommendation

**For learning and testing (NOW):**
```bash
# Stay on devnet (already configured)
NEXT_PUBLIC_SOLANA_RPC=https://api.devnet.solana.com

# Get free test SOL
# Visit: https://faucet.solana.com
```

**For real swaps (WHEN READY):**
```bash
# Switch to mainnet
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com

# Buy 0.1 SOL from exchange
# Transfer to your Phantom wallet
# Try small swap first (0.01 SOL)
```

---

## ❓ FAQ

**Q: Will I lose my wallet if I switch networks?**  
A: No! Your wallet address is the same on all networks. Only the tokens are different (test vs real).

**Q: How much does a swap cost?**  
A: ~0.000005 SOL (less than $0.01) for the transaction fee. But you need tokens to swap!

**Q: Can I use the same wallet for devnet and mainnet?**  
A: Yes! Just switch the network in Phantom. Same wallet, different networks.

**Q: How do I get NOS tokens?**  
A: You need to be on mainnet, then swap SOL for NOS using Jupiter (through this app!).

**Q: Is devnet safe to test?**  
A: Completely safe! It's fake money, so test freely.

---

## 🎯 Next Steps

1. **Right now (Devnet):**
   - Get free test SOL: https://faucet.solana.com
   - Test wallet connection
   - Test balance checks
   - Test SOL transfers

2. **When ready for real swaps (Mainnet):**
   - Update `.env.local` with mainnet RPC
   - Restart server: `npm run dev`
   - Buy small amount of SOL
   - Try "swap SOL to NOS" again

Would you like me to help you get test SOL on devnet first, or do you want to switch to mainnet now?
