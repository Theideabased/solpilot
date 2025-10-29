# Venice & Zerion API Integration Guide

## 🎯 Overview

Your SOLPILOT app now has **4 specialized AI agents**, each with specific roles:

### Agent Breakdown

| Agent | Purpose | Tools | Use Cases |
|-------|---------|-------|-----------|
| **SOLPILOT** | Main Solana assistant | Balance, Price, Swap, Validators, Metrics, Auction | General Solana queries, balances, swaps, staking |
| **Sonia** | Token analyst | Token metadata, analysis | "Analyze SOL token", "Tell me about BONK" |
| **Zerion** | Portfolio analytics | Portfolio, Transactions, PnL, DeFi, NFTs | "Show my portfolio", "What's my PnL?", "Show my NFTs" |
| **Venice** | Research & news | Web search, Topic research | "Latest Solana news", "Recent partnerships", "Explain Jupiter" |

---

## 🔧 API Configuration Status

### ✅ Venice API (Research)
```bash
VENICE_API=3DrLB6aVn_IZx5YOGgPQQg20wB_S2F-O5_m4-frbQx
```
**Status:** Configured and active
**Endpoint:** `https://api.venice.ai/api/v1/chat/completions`
**Model:** `llama-3.3-70b`
**Features:** Web search enabled

**What Venice Does:**
- 🔍 Real-time web search for Solana news
- 📰 Fetches from trusted crypto sources:
  - CoinTelegraph
  - CoinDesk
  - Medium (Solana Labs)
  - Solana official blog
  - The Block
  - Decrypt
  - Crypto.news

**Venice Tools:**
1. `searchNews` - Search latest Solana news with optional focus area (defi, nft, governance, partnerships, technical)
2. `researchTopic` - Deep research on specific topics with varying depth (summary, detailed, comprehensive)

### ✅ Zerion API (Portfolio Analytics)
```bash
ZERION_API_KEY=zk_dev_50c8a3ecd4794a69b76a24bdc2b401a6
```
**Status:** Configured and active
**Endpoint:** `https://api.zerion.io/v1`
**Auth:** Basic (API key as username, no password)

**What Zerion Does:**
- 📊 Multi-chain portfolio tracking (Solana + 25+ EVM chains)
- 💰 PnL calculations
- 📈 Transaction history with decoded details
- 🏦 DeFi positions (staking, LP, lending)
- 🖼️ NFT holdings with metadata
- 💹 Token prices and market data

**Zerion Tools:**
1. `getPortfolio` - Complete portfolio overview
2. `getTransactions` - Transaction history with decoding
3. `getPnL` - Profit/loss calculations
4. `getDeFiPositions` - DeFi protocol positions
5. `getNFTs` - NFT holdings
6. `getTokenData` - Token prices and market stats

---

## 🧪 Testing Guide

### Test 1: Venice News Search
**Query:** `"What's the latest Solana news?"`

**Expected Flow:**
1. Router detects "latest" keyword → Routes to Venice agent
2. Venice agent uses `searchNews` tool
3. Tool makes request to Venice API with web search enabled
4. Returns formatted news with sources and dates

**Expected Response Format:**
```
📰 Solana News - Latest Updates

Key Highlights:
• [Update 1] - Brief description
  Source: https://...
  Date: January XX, 2025

• [Update 2] - Brief description
  Source: https://...
  Date: January XX, 2025

What This Means:
[Context and implications]
```

**Test Command (curl):**
```bash
curl -X POST https://api.venice.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 3DrLB6aVn_IZx5YOGgPQQg20wB_S2F-O5_m4-frbQx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.3-70b",
    "messages": [
      {
        "role": "user",
        "content": "What are the latest Solana news updates?"
      }
    ],
    "venice_parameters": {
      "enable_web_search": "on"
    }
  }'
```

### Test 2: Venice Topic Research
**Query:** `"Explain Jupiter DEX"`

**Expected Flow:**
1. Router detects general query → Stays with SOLPILOT or routes to Venice
2. Venice agent uses `researchTopic` tool
3. Tool researches with web search
4. Returns structured explanation

**Expected Response Format:**
```
🔍 Research: Jupiter DEX

Overview:
[What it is and why it matters]

Key Details:
[Important facts and features]

Ecosystem Impact:
[How it affects Solana]

Current Status:
[Latest developments]

Resources:
[Links to docs and official sites]
```

### Test 3: Zerion Portfolio Check
**Query:** `"Show my portfolio"`

**Expected Flow:**
1. Router detects "portfolio" keyword → Routes to Zerion agent
2. Zerion agent uses `getPortfolio` tool with user's wallet address
3. Tool queries Zerion API
4. Returns formatted portfolio data

**Expected Response Format:**
```
📊 Portfolio Overview

Total Value: $45,678
Top Holdings:
• SOL: $12,345 (27%)
• USDC: $8,900 (19.5%)
• BONK: $3,456 (7.6%)

View full portfolio on Zerion
```

**Test Command (curl):**
```bash
curl -X GET "https://api.zerion.io/v1/wallets/YOUR_ADDRESS/positions?currency=usd" \
  -H "Authorization: Basic $(echo -n 'zk_dev_50c8a3ecd4794a69b76a24bdc2b401a6:' | base64)"
```

### Test 4: Zerion Transaction History
**Query:** `"Show my recent transactions"`

**Expected Flow:**
1. Router detects "transaction" → Routes to Zerion agent
2. Agent uses `getTransactions` tool
3. Returns decoded transaction list

**Expected Response Format:**
```
📈 Recent Activity

Last 5 Transactions:
1. ✅ Swapped 100 USDC → 0.5 SOL
   Date: Jan 15, 2025
   
2. ✅ Staked 50 SOL to Marinade
   Date: Jan 14, 2025

[etc...]
```

### Test 5: Zerion PnL Calculation
**Query:** `"What's my profit and loss?"`

**Expected Flow:**
1. Router detects "profit" or "pnl" → Routes to Zerion
2. Agent uses `getPnL` tool
3. Calculates total PnL from positions

**Expected Response Format:**
```
💰 Profit & Loss Analysis

Total P&L: +$5,678 (+14.2%)
Total Invested: $40,000
Current Value: $45,678

Best Performer: BONK +$2,100 (+156%)
Worst Performer: SAMO -$345 (-12%)

Your portfolio is performing well!
```

---

## 🔀 Routing Logic

### How Queries Are Routed

Located in: `/app/services/mastraService.ts`

```typescript
// Venice (Research & News)
if (includes: 'news', 'research', 'latest', 'update', 
   'what happened', 'recent', 'partnership', 'announcement')
   → Route to Venice

// Zerion (Portfolio)
if (includes: 'portfolio', 'my balance', 'my wallet', 
   'transaction history', 'pnl', 'profit', 'loss', 
   'defi position', 'my nft')
   → Route to Zerion

// Sonia (Token Analysis)
if (includes: 'token' AND ('analyze' OR 'analysis'))
   → Route to Sonia

// Default: SOLPILOT (General Solana)
else → Route to SOLPILOT
```

---

## 🔑 API Testing Commands

### Verify Venice API
```bash
curl -X POST https://api.venice.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $VENICE_API" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.3-70b",
    "messages": [{"role": "user", "content": "Hello"}],
    "venice_parameters": {"enable_web_search": "off"}
  }'
```

**Expected:** Status 200, JSON response with `choices[0].message.content`

### Verify Zerion API
```bash
# Test with Solana address
curl -X GET "https://api.zerion.io/v1/wallets/YOUR_SOLANA_ADDRESS/positions" \
  -H "Authorization: Basic $(echo -n 'zk_dev_50c8a3ecd4794a69b76a24bdc2b401a6:' | base64)"
```

**Expected:** 
- Status 200 = Working (may have empty data for devnet addresses)
- Status 401 = API key invalid
- Status 404 = Address not found (normal for new/devnet addresses)

---

## 📋 Common Issues & Solutions

### Venice Not Returning News
**Symptom:** Agent says "I couldn't find recent updates"

**Possible Causes:**
1. Web search not enabled in tool call
2. API rate limiting
3. No recent news in last 72 hours

**Solution:**
- Check that `enable_web_search: 'on'` is set in tool
- Verify Venice API key is valid
- Try broader search terms

### Zerion Returns Empty Data
**Symptom:** "No positions found" or empty portfolio

**Possible Causes:**
1. Using devnet address (Zerion tracks mainnet only)
2. New wallet with no transactions
3. Wrong chain parameter

**Solution:**
- Use a mainnet Solana address with activity
- Test with known address: `So11111111111111111111111111111111111111112` (wrapped SOL)
- Verify chain is "solana" not "solana-devnet"

### Agent Not Being Routed Correctly
**Symptom:** Wrong agent responds to query

**Possible Causes:**
1. Query keywords don't match routing logic
2. Agent name mismatch

**Solution:**
- Check `/app/services/mastraService.ts` routing logic
- Add more specific keywords to routing conditions
- Test with explicit agent mentions: "Venice, what's the latest news?"

---

## 🚀 Quick Start Testing

1. **Restart dev server:**
   ```bash
   npm run dev
   ```

2. **Test Venice (News):**
   ```
   Query: "What's the latest Solana news?"
   Expected: Venice searches and returns recent updates with sources
   ```

3. **Test Venice (Research):**
   ```
   Query: "Explain how Solana staking works"
   Expected: Venice researches and provides detailed explanation
   ```

4. **Test Zerion (Portfolio):**
   ```
   Query: "Show my portfolio"
   Expected: Zerion fetches portfolio data for connected wallet
   Note: Must have wallet connected with mainnet activity
   ```

5. **Test Zerion (Transactions):**
   ```
   Query: "Show my transaction history"
   Expected: Zerion lists recent transactions with details
   ```

6. **Test routing:**
   ```
   Query: "Recent Solana partnerships"
   Expected: Routes to Venice (contains "recent" + "partnership")
   ```

---

## 📊 Agent Capabilities Matrix

| Query Type | Agent | Tool Used | API Called |
|------------|-------|-----------|------------|
| "Latest Solana news" | Venice | searchNews | Venice AI (web search) |
| "Explain Jupiter DEX" | Venice | researchTopic | Venice AI (web search) |
| "Show my portfolio" | Zerion | getPortfolio | Zerion API /positions |
| "My transaction history" | Zerion | getTransactions | Zerion API /transactions |
| "What's my PnL?" | Zerion | getPnL | Zerion API /positions |
| "Show my NFTs" | Zerion | getNFTs | Zerion API /nft-positions |
| "Analyze SOL token" | Sonia | Token metadata | Jupiter/internal tools |
| "What is Solana?" | SOLPILOT | None (educational) | None (from knowledge) |
| "SOL price" | SOLPILOT | fetchTokenPrice | Jupiter Price API |
| "Show validators" | SOLPILOT | fetchValidators | Solana RPC |

---

## ✅ Configuration Checklist

- [x] Venice API key configured in `.env.local`
- [x] Zerion API key configured in `.env.local`
- [x] Venice agent created with web search tools
- [x] Zerion agent configured with portfolio tools
- [x] Routing logic updated in mastraService
- [x] All agents exported from mastra/index.ts
- [x] Chat provider handles all agent names
- [x] MCP server routes updated

---

## 🎯 Next Steps

1. **Test all query types** listed in Quick Start Testing
2. **Verify API responses** using curl commands
3. **Check routing** by trying queries with different keywords
4. **Monitor console logs** for errors or API issues
5. **Test with mainnet wallet** for real Zerion data

All APIs are configured and ready to use! 🚀
