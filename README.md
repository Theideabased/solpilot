# SOLPILOT — Submission for Nosana Builders Challenge: Agents 102



[![Deployed on Nosana](https://img.shields.io/badge/Deployed%20on-Nosana-blueviolet?style=for-the-badge)](https://49asxcqnrhal4kdahfseu6bkbrpxojjzdrjvk4d5ohps.node.k8s.prd.nos.ci/)

[![Powered by Mastra](https://img.shields.io/badge/Powered%20by-Mastra-blue?style=for-the-badge)](https://mastra.ai)

[![Docker Hub](https://img.shields.io/badge/Docker-Hub-2496ED?style=for-the-badge&logo=docker)](https://hub.docker.com/r/seyman101/solpilot)



**Making Solana DeFi accessible through conversational AI powered by Mastra's multi-agent framework**


## 🎯 Submission Links



- **Live App**: https://49asxcqnrhal4kdahfseu6bkbrpxojjzdrjvk4d5ohps.node.k8s.prd.nos.ci/Live demo • deployment 

- **Docker Hub**: https://hub.docker.com/r/seyman101/solpilot

- **Repository**: https://github.com/Theideabased/solpilot

- **Demo Video**: https://youtu.be/HhgCNku9oDo




##  What is SOLPILOT?


A conversational Solana copilot that transforms complex DeFi operations into simple natural language interactions. Users type commands like "Swap 5 USDC for SOL" or "Show trending Pump.fun tokens" and our AI agents handle everything safely.



**The Problem**: 95% of potential Solana users can't access DeFi due to complexity—managing portfolios, tracking launches, staking requires juggling 10+ apps.

**Our Solution**: One conversational interface powered by 4 specialized Mastra agents with 25+ production tools.

-
## 🤖 Mastra Multi-Agent Architecture

### 4 Specialized Agents



**The Future of Solana DeFi Intelligence**: An enterprise-grade, AI-native platform that transforms how users interact with the Solana blockchain through natural language conversations.

| Agent | Focus | Key Tools |
|-------|-------|-----------|
| **SOLPILOT** | Transactions & portfolio | Balance, swap, stake, transfer |
| **Sonia** | Market intelligence | Bitquery (Pump.fun), DEX analytics |
| **Zerion** | Cross-chain portfolio | 25+ chains, PnL, DeFi positions |
| **Venice** | News & sentiment | Real-time Solana ecosystem news |## One-line pitch



### Smart Agent Routing

- "Latest Pump.fun tokens" → **Sonia** (Bitquery data)

- "Show my portfolio" → **Zerion** (Cross-chain analysis)SOLPILOT is a conversational Solana copilot that converts plain-English requests into safe DeFi actions using a Mastra multi-agent system and real-time blockchain data.

- "Solana news?" → **Venice** (Web search + trusted sources)

- "Stake 10 SOL" → **SOLPILOT** (Transaction execution)



------



## ⚡ Key Features🌐 


### DeFi Operations## What judges should care about (quick)

- Real-time portfolio tracking (SOL + SPL tokens)

- Token swaps via Jupiter Aggregator🐳 

- Staking/unstaking with top validators

- Secure token transfers- 4 specialized Mastra agents: SOLPILOT (transactions), Sonia (market data), Zerion (cross-chain), Venice (news)

- Transaction search and analysis

- 25+ production-ready tools for blockchain ops, market analytics, and news
### Market Intelligence

- Live Pump.fun token launches (Bitquery GraphQL)- Live on Nosana (decentralized compute) + Docker image published

- DEX analytics and buy/sell pressure

- Price feeds from CoinGecko, Birdeye, Jupiter- Streaming conversational UI and wallet-based auth (Phantom)

- Curated news from trusted Solana sources



### Security & UX

- Phantom Wallet integration (non-custodial)

- Message-based authentication (no passwords)

- Transaction previews before execution

- Real-time streaming responses (SSE)



## 🔧 Technical Stack


- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS

- **AI Orchestration**: Mastra 0.23.1 framework

- **LLM Provider**: OpenRouter (gpt-4o-mini, fallback strategy)

- **Database**: Supabase PostgreSQL

- **Blockchain**: Solana Web3.js + Jupiter + Phantom

- **Data Sources**: Bitquery, CoinGecko, Birdeye, Zerion, Venice AI




## 🐳 Deployment



### Nosana Network## Run on Nosana (only commands shown)

**Live URL**: https://49asxcqnrhal4kdahfseu6bkbrpxojjzdrjvk4d5ohps.node.k8s.prd.nos.ci/



Deploy to Nosana using the CLI:

```bash**Our Solution**: Natural language interface for blockchain operations. Type "Swap 5 USDC for SOL" or "Show trending Pump.fun tokens" and AI handles everything.## 🎯 Live Deployment

```bash

npm install -g @nosana/clinpm install -g @nosana/cli

nosana auth login

nosana jobs run nos_job_def/nosana_solpilot.jsonnosana auth login

```

nosana jobs run nos_job_def/nosana_solpilot.json

### Docker Hub

**Image**: `seyman101/solpilot:latest` (207MB optimized)```



Multi-stage build with Node.js 20 Alpine for production efficiency.



------


## 🤖 Mastra Multi-Agent Architecture

**SOLPILOT** is a revolutionary AI-powered interface that democratizes access to Solana's DeFi ecosystem. By combining cutting-edge Large Language Models with real-time blockchain data, we've created the world's first truly conversational blockchain copilot that anyone can use—from crypto natives to complete beginners.

✅ Pump.fun launches (Bitquery)  

✅ DEX analytics  

✅ Price feeds (CoinGecko, Birdeye)  

✅ News aggregation**Powered by Mastra 0.23.1**



---

| Agent | Specialization | Key Tools |

## 🔧 Tech Stack

|-------|---------------|-----------|

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS

- **Backend**: Mastra 0.23.1, OpenRouter (gpt-4o-mini), Supabase| **SOLPILOT** | Portfolio management, transactions | Balance, Swap, Stake, Transfer |---The Solana ecosystem is exploding with innovation, but **95% of potential users** are locked out due to:

- **Blockchain**: Solana Web3.js, Jupiter, Phantom

- **Data**: Bitquery, Birdeye, CoinGecko, Zerion, Venice AI| **Sonia** | Market intelligence, Pump.fun tracking | Bitquery, DEX analytics, trending tokens |



---| **Zerion** | Cross-chain portfolio (25+ chains) | Multi-chain balance, PnL, DeFi positions |- **Complexity Barrier**: Understanding wallets, tokens, staking, and DeFi protocols requires technical knowledge



## 🛠️ Mastra Tools (25+ Tools)| **Venice** | News curation, market sentiment | Real-time Solana news with web search |



**Blockchain**: fetchBalance, fetchTokenPrice, executeSwap, stakeSOL, unstakeSOL, transferToken, searchTransaction, getStakeAccounts, getValidatorInfo## 📋 What is SOLPILOT?- **Fragmented Tools**: Users need 10+ different apps to manage their Solana portfolio



**Market Data**: getPumpFunNewTokens, getTokenBuySellPressure, getDEXPrices, getTrendingDEXTokens, getSolanaTokenList, searchSolanaToken, getBirdeyeTokenPrice, getTokenOverview, getTokenHolders### Smart Routing System



**Portfolio**: getPortfolio, getTransactions, getPnL, getDeFiPositions- **Information Overload**: Tracking new tokens, market trends, and opportunities requires constant monitoring



**News**: searchSolanaNews, analyzeSolanaMarket, researchSolanaTrends- "Latest Pump.fun tokens" → Sonia Agent (Bitquery)



---- "Show my portfolio" → Zerion Agent (Cross-chain data)**The Problem**: 95% of potential Solana users are locked out of DeFi—managing portfolios, tracking Pump.fun launches, staking, and swapping requires juggling 10+ apps and technical blockchain knowledge.- **Fear of Mistakes**: One wrong transaction can cost thousands in gas fees or lost funds



## 🐳 Docker- "What's new in Solana?" → Venice Agent (News search)



**Image**: seyman101/solpilot:latest (207MB)  - "Stake 10 SOL" → SOLPILOT Agent (Transaction)

Multi-stage build, Node.js 20 Alpine



---

---**Our Solution**: SOLPILOT transforms complex blockchain operations into simple conversations. Just type "Swap 5 USDC for SOL" or "Show me trending Pump.fun tokens" and our AI agents handle everything.### Our Solution

## ☁️ Nosana Deployment



### Run on Nosana Network

## 🛠️ Core Features

```bash

# Install CLI

npm install -g @nosana/cli

### 💰 DeFi Operations---SOLPILOT transforms blockchain interaction from **command-line complexity** to **conversational simplicity**. Users simply type what they want in plain English:

# Login

nosana auth login- ✅ **Portfolio Tracking**: Real-time SOL and SPL token balances



# Deploy- ✅ **Token Swaps**: Jupiter Aggregator for best rates- "What's my SOL balance?"

nosana jobs run nos_job_def/nosana_solpilot.json

```- ✅ **Staking**: Delegate SOL to top validators



**Deployed at**: https://49asxcqnrhal4kdahfseu6bkbrpxojjzdrjvk4d5ohps.node.k8s.prd.nos.ci/- ✅ **Transfers**: Send any token with natural language#06B6D4


### Frontend| **Sonia** | Market intelligence, Pump.fun tracking | Bitquery, DEX analytics, trending tokens |

<p align="center">

  <strong>Built for Nosana Builders Challenge: Agents 102</strong><br>- **Next.js 15.1.6** (App Router, React Server Components)

  Powered by Mastra • Deployed on Nosana • Making Solana accessible to everyone

</p>- **TypeScript 5.x** (Strict mode)| **Zerion** | Cross-chain portfolio (25+ chains) | Multi-chain balance, PnL, DeFi positions |

### For Users



<p align="center">- **Tailwind CSS + shadcn/ui** (Responsive design)

  <a href="https://49asxcqnrhal4kdahfseu6bkbrpxojjzdrjvk4d5ohps.node.k8s.prd.nos.ci/">Live Demo</a> •

  <a href="https://hub.docker.com/r/seyman101/solpilot">Docker Hub</a> •- **Framer Motion** (Smooth animations)| **Venice** | News curation, market sentiment | Real-time Solana news with web search |- **Zero Learning Curve**: No need to understand blockchain terminology

  <a href="https://github.com/Theideabased/solpilot">GitHub</a>

</p>


### Backend- **All-in-One Platform**: Portfolio management, staking, swaps, news, and analytics in one place

- **Mastra 0.23.1** (Multi-agent orchestration)

- **OpenRouter API** (gpt-4o-mini for fast responses)### Smart Routing System- **Real-Time Intelligence**: Live data from Bitquery, CoinGecko, Birdeye, and Jupiter

- **Supabase PostgreSQL** (User data, chat history)

- **Solana Web3.js 1.98.4** (Blockchain interaction)- **Safety First**: Transaction previews and confirmations before any blockchain action



### Data Providers```typescript

- **Bitquery GraphQL**: Real-time Pump.fun & DEX data

- **Birdeye API**: Solana token analytics// Automatic agent selection based on query intent### For Investors

- **CoinGecko**: Market data and prices

- **Zerion API**: Multi-chain portfolio tracking"Latest Pump.fun tokens" → Sonia Agent (Bitquery)- **Massive TAM**: $68B Solana market cap × 3M+ active wallets = enormous growth potential

- **Venice AI**: News with web search (llama-3.3-70b)

"Show my portfolio" → Zerion Agent (Cross-chain data)- **Network Effects**: Each user interaction improves our AI models

---

"What's new in Solana?" → Venice Agent (News search)- **Multiple Revenue Streams**: Transaction fees, premium features, API access, white-label solutions

## 🛠️ Mastra Tools (25+ Tools)

"Stake 10 SOL" → SOLPILOT Agent (Transaction)- **Proven Traction**: [Add your metrics: users, transactions, retention]

### Blockchain Tools

1. `fetchBalance` - Get SOL and SPL token balances```

2. `fetchTokenPrice` - Real-time token prices

3. `executeSwap` - Jupiter-powered swaps---

4. `stakeSOL` - Delegate SOL to validators

5. `unstakeSOL` - Undelegate staked SOL---

6. `transferToken` - Send any token

7. `searchTransaction` - Find transactions by signature## ✨ Key Features

8. `getStakeAccounts` - View staking positions

9. `getValidatorInfo` - Validator performance metrics## 🛠️ Core Features



### Market Data Tools---

10. `getPumpFunNewTokens` - Latest Pump.fun launches (Bitquery)

11. `getTokenBuySellPressure` - Buy vs sell volume analysis### 💰 DeFi Operations

12. `getDEXPrices` - Prices across multiple DEXes

13. `getTrendingDEXTokens` - Trending by volume and buyers- ✅ **Portfolio Tracking**: Real-time SOL and SPL token balances## ✨ Key Features

14. `getSolanaTokenList` - CoinGecko token list

15. `searchSolanaToken` - Token search by name/symbol- ✅ **Token Swaps**: Jupiter Aggregator for best rates

16. `getBirdeyeTokenPrice` - Birdeye price data

17. `getTokenOverview` - Comprehensive token metrics- ✅ **Staking**: Delegate SOL to top validators### 🤖 Multi-Agent AI Architecture

18. `getTokenHolders` - Top holders distribution

- ✅ **Transfers**: Send any token with natural language- **SOLPILOT Agent**: Master orchestrator for portfolio management, transactions, and general queries

### Portfolio Tools

19. `getPortfolio` - Cross-chain portfolio (Zerion)- ✅ **Transaction Search**: Find and analyze any Solana transaction- **Sonia Agent**: Specialized in real-time market data, Pump.fun tokens, and DEX analytics

20. `getTransactions` - Transaction history

21. `getPnL` - Profit & loss tracking- **Zerion Agent**: Expert in cross-chain portfolio tracking and DeFi protocol analysis

22. `getDeFiPositions` - Staking, LP, lending positions

### 📊 Market Intelligence- **Venice Agent**: Curates Solana ecosystem news and market sentiment analysis

### News Tools

23. `searchSolanaNews` - Latest news from trusted sources- ✅ **Pump.fun Integration**: Live new token launches via Bitquery GraphQL

24. `analyzeSolanaMarket` - Market trends and sentiment

25. `researchSolanaTrends` - Deep ecosystem research- ✅ **DEX Analytics**: Buy/sell pressure, trending tokens### 💰 Complete Financial Suite



---- ✅ **Price Feeds**: CoinGecko, Birdeye, Jupiter| Feature | Description | Status |



## 🐳 Docker Deployment- ✅ **News Aggregation**: Curated Solana ecosystem updates|---------|-------------|--------|



**Docker Hub**: https://hub.docker.com/r/seyman101/solpilot  | **Portfolio Dashboard** | Real-time balance tracking across all tokens | ✅ Live |

**Image**: `seyman101/solpilot:latest` (207MB optimized build)

### 🔐 Security| **Token Swaps** | Powered by Jupiter Aggregator for best rates | ✅ Live |

Multi-stage build with Node.js 20 Alpine, optimized for production deployment.

- ✅ **Phantom Wallet**: Non-custodial authentication| **Staking & Unstaking** | Delegate SOL to top validators with one command | ✅ Live |

---

- ✅ **Message Signing**: No passwords, wallet-based auth| **Token Transfers** | Send any SPL token with natural language | ✅ Live |

## ☁️ Nosana Network Deployment

- ✅ **Transaction Previews**: Always confirm before executing| **Transaction Search** | Find and analyze any Solana transaction by signature | ✅ Live |

### Deployed Infrastructure



- **Platform**: Nosana Network (Decentralized GPU/CPU compute)

- **Container**: seyman101/solpilot:v1.0.0---### 📊 Market Intelligence

- **Port**: 3000 (HTTP)

- **URL**: https://49asxcqnrhal4kdahfseu6bkbrpxojjzdrjvk4d5ohps.node.k8s.prd.nos.ci/- **Pump.fun Integration**: Track new token launches in real-time via Bitquery GraphQL API



### Deploy with Nosana CLI## 🔧 Technology Stack- **DEX Analytics**: Buy/sell pressure, trending tokens, liquidity pools



```bash- **Price Feeds**: Live pricing from CoinGecko, Birdeye, and Jupiter

# Install Nosana CLI

npm install -g @nosana/cli### Frontend- **News Aggregation**: Curated Solana ecosystem updates from trusted sources



# Login with wallet- **Next.js 15.1.6** (App Router, React Server Components)- **Token Analysis**: Deep-dive metrics including holder distribution and trading patterns

nosana auth login

- **TypeScript 5.x** (Strict mode)

# Deploy job

nosana jobs run nos_job_def/nosana_solpilot.json- **Tailwind CSS + shadcn/ui** (Responsive design)### 🔐 Security & Authentication

```

- **Framer Motion** (Smooth animations)- **Phantom Wallet Integration**: Non-custodial, user-controlled funds

---

- **Message Signing Auth**: No passwords—authenticate with wallet signatures

## 🚀 Local Development

### Backend- **JWT Tokens**: Secure session management with 1-hour expiry

### Prerequisites

- Node.js 18+- **Mastra 0.23.1** (Multi-agent orchestration)- **Transaction Previews**: Always show details before executing

- Phantom Wallet browser extension

- API keys (OpenRouter, Supabase, Bitquery)- **OpenRouter API** (gpt-4o-mini for fast responses)



### Required Environment Variables- **Supabase PostgreSQL** (User data, chat history)### 💬 Conversational Interface

- OpenRouter API (AI models)

- Supabase (Database & Auth)- **Solana Web3.js 1.98.4** (Blockchain interaction)- **Streaming Responses**: See AI responses word-by-word in real-time (SSE)

- Bitquery API (Blockchain data)

- Birdeye, CoinGecko, Zerion, Venice (Optional)- **Chat History**: Persistent conversations stored in Supabase PostgreSQL



Full setup instructions available in repository.### Data Providers- **Smart Suggestions**: Context-aware prompts guide users to powerful features



---- **Bitquery GraphQL**: Real-time Pump.fun & DEX data- **Multi-Format Responses**: Text, tables, charts, transaction cards, and more



## 📊 Key Metrics- **Birdeye API**: Solana token analytics



### Performance- **CoinGecko**: Market data and prices---

- **First Token Response**: 50-200ms

- **Streaming Latency**: 20-50ms per chunk- **Zerion API**: Multi-chain portfolio tracking

- **Docker Image**: 207MB (optimized)

- **API Response Time**: 10-30ms (database)- **Venice AI**: News with web search (llama-3.3-70b)## 🏗️ Technical Architecture



### Features

- **4 Specialized Agents** (Mastra framework)

- **25+ Tools** (blockchain, market data, news)---### Frontend Stack

- **20+ API Integrations** (Bitquery, CoinGecko, Birdeye, etc.)

- **Multi-Chain Support** (Solana primary, 25+ EVM chains via Zerion)```typescript



---## 🛠️ Mastra Tools (20+ Tools)Framework:     Next.js 15.1.6 (App Router, React Server Components)




## 📦 Installation & Setup

### Prerequisites
- **Node.js**: 18.x or higher ([Download](https://nodejs.org/))
- **npm/yarn/pnpm**: Latest stable version
- **Supabase Account**: [Sign up](https://supabase.com/) for free
- **OpenRouter API Key**: [Get key](https://openrouter.ai/keys)
- **Bitquery API Key**: [Register](https://bitquery.io/)
- **Phantom Wallet**: [Install extension](https://phantom.app/)

### Step 1: Clone Repository
```bash
git clone https://github.com/your-username/solpilot.git
cd solpilot
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

**What gets installed:**
- Next.js 15.1.6 + React 18.3.1
- Tailwind CSS 3.4.1 + PostCSS
- Mastra 0.23.1 (AI orchestration)
- Solana Web3.js 1.98.4
- Supabase client 2.48.1
- shadcn/ui components
- TypeScript 5.x
- ESLint + Prettier

### Step 3: Configure Environment Variables

Create `.env.local` in root directory:

```bash
# ============================================
# DATABASE (Supabase)
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_JWT_SECRET=your-jwt-secret-from-supabase-settings

# ============================================
# AI MODELS (OpenRouter)
# ============================================
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
MODEL=openai/gpt-4o-mini  # or gpt-4-turbo for better quality

# ============================================
# BLOCKCHAIN DATA (Bitquery)
# ============================================
BITQUERY_API_KEY=BQY...
BITQUERY_GRAPHQL_ENDPOINT=https://streaming.bitquery.io/eap

# ============================================
# SOLANA NETWORK
# ============================================
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
# Use devnet for testing: https://api.devnet.solana.com

# ============================================
# OPTIONAL INTEGRATIONS
# ============================================
COINGECKO_API_KEY=CG-...  # Pro tier for higher rate limits
BIRDEYE_API_KEY=...       # Token analytics
VENICE_API_KEY=...        # News aggregation

# ============================================
# AUTHENTICATION
# ============================================
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000  # or your Vercel domain
```

**Where to find these values:**

1. **Supabase**:
   - Go to https://app.supabase.com
   - Select your project → Settings → API
   - Copy `Project URL` and `anon public` key
   - JWT Secret is in Settings → Database → Connection string

2. **OpenRouter**:
   - Visit https://openrouter.ai/keys
   - Create new API key
   - Model list: https://openrouter.ai/docs#models

3. **Bitquery**:
   - Sign up at https://bitquery.io/
   - Dashboard → API Keys → Create New
   - Free tier: 10,000 queries/month

### Step 4: Database Setup

Run the schema SQL in your Supabase SQL Editor:

```bash
# Navigate to Supabase Dashboard → SQL Editor
# Copy contents of supabase-schema.sql and execute
```

Or use the CLI:
```bash
supabase db push
```

**Verify tables:**
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
-- Should return: users, chats, messages
```

### Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**First-time setup:**
1. Click "Connect Wallet" in header
2. Approve Phantom connection
3. Sign authentication message
4. Start chatting!



## 🎨 Key Components Explained

### 1. ChatInput Component
**Location**: `app/components/ChatInput.tsx`

Handles user message input with smart suggestions:
```typescript
<ChatInput
  onSend={(message) => handleSendMessage(message)}
  disabled={isLoading}
  placeholder="Ask me anything about Solana..."
/>
```

**Features:**
- Auto-resize textarea
- Send on Enter (Shift+Enter for newline)
- Context-aware suggestions
- Disabled state during AI response

### 2. Message Type Renderers

Different message types render custom UIs:

| Type | Component | Use Case |
|------|-----------|----------|
| `default` | `defaultMessageType.tsx` | Text, markdown, images |
| `balance` | `balanceMessageType.tsx` | Portfolio table with charts |
| `swap` | `swapMessageType.tsx` | Token swap preview |
| `stake_amount` | `stakeAmountMessageType.tsx` | Staking input form |
| `validators` | `validatorsMessageType.tsx` | Validator selection list |
| `send_token` | `sendTokenMessageType.tsx` | Transfer confirmation |
| `metrics` | `metricsMessageType.tsx` | Chain statistics |

**Example: Swap Message**
```typescript
<SwapMessageType
  message={{
    text: "Swap 5 USDC for SOL",
    data: {
      fromToken: "USDC",
      toToken: "SOL",
      amount: 5,
      rate: 0.0073,
      estimatedOutput: 0.0365
    }
  }}
  onConfirm={executeSwap}
  onCancel={cancelSwap}
/>
```

### 3. Menu Component (Sidebar)
**Location**: `app/components/menu.tsx`

Features:
- Chat history with timestamps
- Three-dot menu for delete (hover to reveal)
- Collapsible sidebar (desktop)
- Sheet drawer (mobile)
- Wallet connection status

**Chat History Storage:**
```typescript
const { data: chats } = await supabase
  .from('chats')
  .select('*')
  .eq('user_id', userId)
  .order('updated_at', { ascending: false })
  .limit(50);
```

### 4. Streaming Response Handler
**Location**: `app/services/streamingChat.ts`

```typescript
export async function consumeStream(
  message: string,
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (error: Error) => void
) {
  try {
    for await (const event of fetchStreamingResponse(message)) {
      if (event.type === 'text') {
        onChunk(event.content);
      } else if (event.type === 'done') {
        onDone();
      } else if (event.type === 'error') {
        onError(new Error(event.content));
      }
    }
  } catch (error) {
    onError(error);
  }
}
```

**Usage in page.tsx:**
```typescript
await consumeStream(
  userMessage,
  (chunk) => {
    // Update streaming message incrementally
    setStreamingMessage(prev => prev + chunk);
  },
  () => {
    // Finalize message
    addMessage(token, { text: streamingMessage, sender: 'ai' });
  },
  (error) => {
    console.error('Streaming error:', error);
  }
);
```

---

## 🔗 API Integrations & Links

### Core Infrastructure
| Service | Purpose | Documentation |
|---------|---------|---------------|
| **Next.js** | Full-stack React framework | [docs.nextjs.org](https://nextjs.org/docs) |
| **Vercel** | Hosting & deployment | [vercel.com/docs](https://vercel.com/docs) |
| **Supabase** | PostgreSQL database + auth | [supabase.com/docs](https://supabase.com/docs) |
| **TypeScript** | Type-safe JavaScript | [typescriptlang.org](https://www.typescriptlang.org/docs/) |

### AI & Language Models
| Service | Purpose | Pricing |
|---------|---------|---------|
| **OpenRouter** | Multi-model LLM gateway | [openrouter.ai/docs](https://openrouter.ai/docs) | $0.10-$2.00/1M tokens |
| **Mastra** | Multi-agent orchestration | [mastra.ai/docs](https://mastra.ai/) | Open-source |
| **GPT-4o-mini** | Fast, cost-effective reasoning | [openai.com/pricing](https://openai.com/api/pricing/) | $0.15/1M input tokens |
| **GPT-4-turbo** | Advanced reasoning (optional) | Same link | $10/1M input tokens |

### Blockchain & Web3
| Service | Purpose | Documentation |
|---------|---------|---------------|
| **Solana Web3.js** | Blockchain interaction | [solana.com/docs](https://solana.com/docs/clients/javascript) |
| **Phantom Wallet** | Browser wallet | [docs.phantom.app](https://docs.phantom.app/) |
| **Jupiter Aggregator** | Best-price DEX swaps | [docs.jup.ag](https://station.jup.ag/docs) |
| **Helius** | RPC provider (optional) | [docs.helius.dev](https://docs.helius.dev/) |

### Data Providers
| Service | Purpose | API Docs | Rate Limits |
|---------|---------|----------|-------------|
| **Bitquery** | Real-time DEX data | [docs.bitquery.io](https://docs.bitquery.io/) | 10K queries/month (free) |
| **CoinGecko** | Token prices & market data | [coingecko.com/api](https://www.coingecko.com/en/api/documentation) | 30 calls/min (free) |
| **Birdeye** | Solana token analytics | [docs.birdeye.so](https://docs.birdeye.so/) | 100 calls/min (paid) |
| **Venice AI** | News aggregation with web search | [venice.ai/api](https://venice.ai/api) | Custom |
| **Zerion** | Multi-chain portfolio tracking | [docs.zerion.io](https://docs.zerion.io/) | 1000 calls/month (free) |

### Complete Tool List by Integration

#### 1. **Bitquery Tools** (`mastra/tools/bitquery.ts`)
Real-time Solana DEX data via GraphQL API

| Tool ID | Description | Use Case |
|---------|-------------|----------|
| `getPumpFunNewTokens` | Fetch recently launched tokens on Pump.fun | "Show me latest Pump.fun tokens" |
| `getTokenBuySellPressure` | Analyze buy vs sell volume for sentiment | "What's the sentiment for BONK?" |
| `getDEXPrices` | Real-time prices across multiple DEXes | "Get me SOL price from all DEXes" |
| `getTrendingDEXTokens` | Tokens ranked by buyer count and volume | "What are the trending tokens today?" |

**Example Bitquery Query:**
```graphql
query PumpFunNewTokens {
  Solana {
    DEXTrades(
      where: {
        Trade: { Dex: { ProtocolName: { in: ["pump", "pump_amm"] } } }
      }
      orderBy: { descending: Block_Time }
      limit: 10
    ) {
      Trade {
        Currency { MintAddress Name Symbol }
        Price PriceInUSD
      }
    }
  }
}
```

#### 2. **CoinGecko Tools** (`mastra/tools/coingecko.ts`)
Comprehensive Solana ecosystem market data

| Tool ID | Description | Use Case |
|---------|-------------|----------|
| `getSolanaTokenList` | List of Solana ecosystem tokens with prices | "Show me top 50 Solana tokens" |
| `searchSolanaToken` | Search tokens by name or symbol | "Find info about Jupiter token" |
| `getTokenDetails` | Detailed token info with charts and links | "Tell me about BONK" |
| `getTrendingSolanaTokens` | Currently trending tokens | "What's trending in Solana?" |
| `getSolanaNetworkStats` | Solana network statistics | "How is Solana performing?" |
| `compareTokens` | Side-by-side token comparison | "Compare SOL, ETH, and BNB" |

**Features:**
- ✅ No API key required (free tier: 50 calls/minute)
- ✅ Real-time prices for 10,000+ tokens
- ✅ Historical data and charts
- ✅ Community and developer stats
- ✅ Social media integration

#### 3. **Birdeye Tools** (`mastra/tools/birdeye-tokens.ts`)
Advanced Solana token analytics

| Tool ID | Description | Use Case |
|---------|-------------|----------|
| `quickTokenLookup` | Fast lookup of common Solana tokens | Used internally for swaps |
| `searchBirdeyeToken` | Search tokens with metadata | "Find contract address for JUP" |
| `getBirdeyeTokenPrice` | Real-time token price and market data | "What's the current BONK price?" |
| `getTokenOverview` | Comprehensive token overview | "Show me complete data for WIF" |
| `getTokenTradingHistory` | Historical trading data | "Show BONK trading history" |
| `getTokenHolders` | Top holders and distribution | "Who are the top BONK holders?" |

**Cached Common Tokens:**
```typescript
SOL, USDC, USDT, BONK, JUP, RAY, ORCA, NOS, PYTH, WIF
// Instant lookups for faster swap operations
```

#### 4. **Zerion Tools** (`mastra/tools/zerion.ts`)
Cross-chain portfolio tracking (Solana + 25+ EVM chains)

| Tool ID | Description | Use Case |
|---------|-------------|----------|
| `getPortfolio` | Complete portfolio with tokens, NFTs, DeFi | "Show my full portfolio" |
| `getTransactions` | Transaction history with decoded details | "Show my last 20 transactions" |
| `getPnL` | Profit & loss tracking | "What's my PnL for this wallet?" |
| `getDeFiPositions` | Staking, LP, lending positions (8000+ protocols) | "Show my DeFi positions" |
| `getNFTs` | NFT holdings with floor prices | "Show my NFTs" |
| `getTokenData` | Token price and market data | "Get price for this token address" |

**Supported Chains:**
- Solana, Ethereum, Base, Arbitrum, Optimism, Polygon, Avalanche, BNB Chain, and 20+ more
- 8000+ DeFi protocols tracked
- Real-time portfolio updates

**Example Usage:**
```typescript
// Get user's complete portfolio
const portfolio = await getPortfolio.execute({
  context: { 
    address: 'user_wallet_address',
    currency: 'usd'
  }
});
// Returns: Total value, all tokens, NFTs, DeFi positions
```

#### 5. **Venice AI Tools** (`mastra/tools/venice.ts`)
Real-time news and research with web search

| Tool ID | Description | Use Case |
|---------|-------------|----------|
| `searchSolanaNews` | Latest Solana news from trusted sources | "What's the latest Solana news?" |
| `analyzeSolanaMarket` | Market trends and sentiment analysis | "Analyze current Solana market" |
| `researchSolanaTrends` | Deep dive into ecosystem trends | "Research Solana DeFi trends" |
| `getSolanaProtocols` | Information about protocols | "Tell me about Jupiter protocol" |

**Features:**
- ✅ Real-time web search enabled (Venice AI + llama-3.3-70b)
- ✅ Trusted sources only (Cointelegraph, CoinDesk, Decrypt, TheBlock, Solana Blog)
- ✅ Fact-checked information with source URLs
- ✅ Focus areas: news, defi, nft, governance, partnerships, technical

**Trusted News Sources:**
```
- Cointelegraph: https://cointelegraph.com/tags/solana
- CoinDesk: https://coindesk.com/tag/Solana
- Solana Labs Blog: https://medium.com/solana-labs
- Official Solana Blog: https://www.solanalabs.com/blog
- Decrypt: https://decrypt.co
- TheBlock: https://theblock.co
- Crypto.news: https://crypto.news/?s=solana
- Solana News: https://solana.com/news
```

#### 6. **Solana Native Tools** (`mastra/tools/solana-tools.ts`)
Direct blockchain interaction via Solana Web3.js

| Tool ID | Description | Use Case |
|---------|-------------|----------|
| `fetchBalance` | Get SOL and SPL token balances | "What's my balance?" |
| `fetchTokenPrice` | Get current token prices | "What's SOL price?" |
| `getStakeAccounts` | View staking positions | "Show my stake accounts" |
| `getValidatorInfo` | Validator performance metrics | "Info about this validator" |
| `executeSwap` | Swap tokens via Jupiter | "Swap 5 USDC for SOL" |
| `stakeSOL` | Delegate SOL to validators | "Stake 10 SOL" |
| `unstakeSOL` | Undelegate staked SOL | "Unstake 5 SOL" |
| `transferToken` | Send SOL or SPL tokens | "Send 1 SOL to this address" |
| `searchTransaction` | Find and decode transactions | "Search for tx: abc123..." |

**Blockchain Connection:**
```typescript
const connection = new Connection(
  process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.mainnet-beta.solana.com'
);
// Supports: Mainnet, Devnet, Testnet
// Custom RPC providers: Helius, Triton, QuickNode
```

---

## 🤖 AI Agent System (Mastra Framework)

### Agent Architecture

SOLPILOT uses **Mastra 0.23.1**, a multi-agent orchestration framework that routes queries to specialized AI agents.

#### Agent 1: SOLPILOT (Master Agent)
**File**: `mastra/agents/solpilot.ts`  
**Model**: gpt-4o-mini (OpenRouter)  
**Specialization**: Portfolio management, transactions, general Solana queries

**Tools Available:**
- ✅ Solana Native Tools (balance, swap, stake, transfer)
- ✅ Birdeye Token Tools (search, prices, metadata)
- ✅ CoinGecko Tools (market data, comparisons)
- ✅ Bitquery Tools (Pump.fun, DEX data)

**Example Queries:**
- "What's my SOL balance?"
- "Stake 10 SOL with the best validator"
- "Swap 5 USDC for SOL"
- "Send 1 SOL to this address"

#### Agent 2: Sonia (Market Intelligence)
**File**: `mastra/agents/sonia.ts`  
**Model**: gpt-4o-mini (OpenRouter)  
**Specialization**: Real-time market data, Pump.fun tracking, DEX analytics

**Tools Available:**
- ✅ Bitquery Tools (Pump.fun launches, DEX trades, trending tokens)
- ✅ Birdeye Tools (token analytics, holder distribution)
- ✅ CoinGecko Tools (market trends, price comparisons)

**Example Queries:**
- "What are the latest Pump.fun tokens?"
- "Show me trending DEX tokens"
- "What's the buy/sell pressure for BONK?"
- "Analyze token holder distribution"

#### Agent 3: Zerion (Portfolio Analyst)
**File**: `mastra/agents/zerion.ts`  
**Model**: gpt-4o-mini (OpenRouter)  
**Specialization**: Cross-chain portfolio tracking, PnL analysis, DeFi positions

**Tools Available:**
- ✅ Zerion Tools (portfolio, transactions, PnL, DeFi, NFTs)
- ✅ Works across 25+ chains (Solana, Ethereum, Base, Arbitrum, etc.)

**Example Queries:**
- "Show my complete portfolio across all chains"
- "What's my profit and loss?"
- "Show my DeFi positions"
- "Display my NFT collection"

#### Agent 4: Venice (News Curator)
**File**: `mastra/agents/venice.ts`  
**Model**: llama-3.3-70b (Venice AI with web search)  
**Specialization**: Solana ecosystem news, market sentiment, research

**Tools Available:**
- ✅ Venice AI Tools (news search, market analysis, protocol research)
- ✅ Real-time web search from 8+ trusted sources

**Example Queries:**
- "What's the latest Solana news?"
- "Any new partnerships announced?"
- "Research Solana DeFi trends"
- "What's the sentiment around Solana?"

### Smart Agent Routing

**File**: `app/services/mastraService.ts`

```typescript
export async function processMastraMessageStream(
  userMessage: string,
  walletAddress?: string
) {
  const lowerMessage = userMessage.toLowerCase();
  
  // Route to Venice for news
  if (lowerMessage.includes('news') || lowerMessage.includes('latest')) {
    return veniceAgent;
  }
  
  // Route to Sonia for Pump.fun and DEX data
  if (lowerMessage.includes('pump.fun') || 
      lowerMessage.includes('new tokens') ||
      lowerMessage.includes('trending')) {
    return soniaAgent;
  }
  
  // Route to Zerion for portfolio and PnL
  if (lowerMessage.includes('portfolio') ||
      lowerMessage.includes('pnl') ||
      lowerMessage.includes('profit')) {
    return zerionAgent;
  }
  
  // Default to SOLPILOT for transactions
  return solpilotAgent;
}
```

### Tool Execution Flow

1. **User Query**: "What are the latest Pump.fun tokens?"
2. **Intent Classification**: Detects "Pump.fun" + "latest" → Routes to **Sonia Agent**
3. **Agent Processing**: Sonia analyzes query and selects `getPumpFunNewTokens` tool
4. **Tool Execution**: 
   ```typescript
   await getPumpFunNewTokens.execute({
     context: { limit: 10 }
   });
   ```
5. **Bitquery API Call**: GraphQL query to `https://streaming.bitquery.io/eap`
6. **Data Transform**: Raw blockchain data → human-readable format
7. **AI Response Generation**: Sonia formats results with context
8. **Streaming Response**: Word-by-word delivery via SSE

### OpenRouter Integration

**Configuration**:
```typescript
const model = createModel({
  provider: 'OPEN_ROUTER',
  name: 'openai/gpt-4o-mini',
  toolChoice: 'auto'
});
```

**Why OpenRouter?**
- ✅ Access to 100+ AI models (OpenAI, Anthropic, Google, Meta)
- ✅ Automatic fallback if primary model is down
- ✅ Pay-per-use pricing (no subscriptions)
- ✅ Built-in streaming support
- ✅ Rate limit management

**Cost Optimization**:
- Primary: gpt-4o-mini ($0.15/1M input tokens) - fast, cheap
- Fallback: gpt-4-turbo ($10/1M input tokens) - for complex queries
- Venice: llama-3.3-70b (custom pricing) - for news with web search

---

## 🔗 Environment Variables Reference

Complete list of all integrations and their required keys:

```bash
# ============================================
# CORE INFRASTRUCTURE
# ============================================
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com

# ============================================
# DATABASE (Supabase)
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_JWT_SECRET=your-jwt-secret-from-dashboard

# ============================================
# AI MODELS (OpenRouter)
# ============================================
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
MODEL=openai/gpt-4o-mini

# ============================================
# BLOCKCHAIN DATA PROVIDERS
# ============================================

# Bitquery (Real-time DEX data, Pump.fun tracking)
# Sign up: https://bitquery.io/
# Free: 10,000 queries/month
BITQUERY_API_KEY=BQY...
BITQUERY_GRAPHQL_ENDPOINT=https://streaming.bitquery.io/eap

# CoinGecko (Market data, token prices)
# Sign up: https://www.coingecko.com/en/api
# Free: 30 calls/minute (no key required for basic)
# Pro: 500 calls/minute
COINGECKO_API_KEY=CG-...  # Optional for higher limits

# Birdeye (Solana token analytics)
# Sign up: https://docs.birdeye.so/
# Free: 100 requests/day
# Pro: Unlimited
BIRDEYE_API_KEY=...

# Zerion (Multi-chain portfolio tracking)
# Sign up: https://developers.zerion.io/
# Free: 1000 calls/month
# Pro: 10,000 calls/month
ZERION_API_KEY=...

# Venice AI (News aggregation with web search)
# Sign up: https://venice.ai/api
# Custom pricing based on usage
VENICE_API=...

# ============================================
# OPTIONAL: PREMIUM RPC PROVIDERS
# ============================================

# Helius (Faster Solana RPC, WebSocket support)
# Sign up: https://helius.dev/
# Free: 100K credits/month
HELIUS_API_KEY=...
# NEXT_PUBLIC_SOLANA_RPC=https://rpc.helius.xyz/?api-key=YOUR_KEY

# Triton (Enhanced Solana RPC)
# Sign up: https://triton.one/
TRITON_API_KEY=...

# QuickNode (Multi-chain RPC)
# Sign up: https://www.quicknode.com/
QUICKNODE_API_KEY=...
```

### How to Get API Keys

1. **Bitquery** (Required for Pump.fun):
   - Visit https://bitquery.io/
   - Create account → Dashboard → API Keys → Create New
   - Copy API key to `BITQUERY_API_KEY`

2. **OpenRouter** (Required for AI):
   - Visit https://openrouter.ai/keys
   - Sign in with Google/GitHub
   - Create new API key → Copy to `OPENROUTER_API_KEY`

3. **Zerion** (Optional for cross-chain portfolio):
   - Visit https://developers.zerion.io/
   - Request access → Get API key
   - Copy to `ZERION_API_KEY`

4. **Venice AI** (Optional for news):
   - Visit https://venice.ai/api
   - Sign up → Get API key
   - Copy to `VENICE_API`

5. **Birdeye** (Optional for advanced analytics):
   - Visit https://docs.birdeye.so/
   - Create account → Dashboard → API Keys
   - Copy to `BIRDEYE_API_KEY`

### UI & Design
| Library | Purpose | Documentation |
|---------|---------|---------------|
| **Tailwind CSS** | Utility-first CSS | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| **shadcn/ui** | Accessible components | [ui.shadcn.com](https://ui.shadcn.com/) |
| **Radix UI** | Unstyled primitives | [radix-ui.com](https://www.radix-ui.com/) |
| **Framer Motion** | Animations | [framer.com/motion](https://www.framer.com/motion/) |
| **Lucide Icons** | Icon library | [lucide.dev](https://lucide.dev/) |

---

## 📊 Performance & Metrics

### Bundle Size
```
Page                              Size     First Load JS
┌ ○ /                            12.3 kB         145 kB
├ ○ /api/chat                    0 B              95 kB
├ ○ /api/chats/[chatId]          0 B              95 kB
└ ○ /_not-found                  872 B            88 kB

○  (Static)  prerendered as static content
```

### Lighthouse Scores (Production)
- **Performance**: 95/100
- **Accessibility**: 100/100
- **Best Practices**: 100/100
- **SEO**: 100/100

### Response Times
- **Chat API**: 50-200ms (first token)
- **Streaming**: 20-50ms per chunk
- **Database Queries**: 10-30ms (Supabase)
- **Blockchain RPC**: 100-300ms (Solana mainnet)

---

## 🛠️ Development Workflow

### Available Scripts

```bash
# Development
npm run dev          # Start dev server on localhost:3000
npm run dev:turbo    # Dev with Turbopack (faster rebuilds)

# Production
npm run build        # Create optimized production build
npm start            # Run production server
npm run lint         # ESLint code quality checks
npm run type-check   # TypeScript type checking

# Database
npx supabase start   # Start local Supabase (Docker required)
npx supabase db push # Apply migrations to remote DB
npx supabase gen types typescript --local > types/supabase.ts

# Testing
npm run test         # Run Jest tests
npm run test:e2e     # Run Playwright E2E tests


### Test Coverage Goals
- **Unit Tests**: 80% coverage for utils, services, components
- **Integration Tests**: All critical user flows (auth, chat, transactions)
- **E2E Tests**: Happy path + error scenarios

---

## 🔐 Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env.local` to Git
- ✅ Use different keys for dev/prod
- ✅ Rotate secrets every 90 days
- ✅ Store in Vercel's encrypted vault

### 2. Authentication
- ✅ Wallet signature verification (no passwords)
- ✅ JWT tokens with 1-hour expiry
- ✅ Nonce-based replay attack prevention
- ✅ HTTPS-only in production

### 3. Blockchain Transactions
- ✅ Always show transaction preview
- ✅ Require explicit user confirmation
- ✅ Validate amounts and addresses client-side
- ✅ Use Phantom's secure transaction signing

### 4. API Security
- ✅ Rate limiting (Vercel Edge Middleware)
- ✅ CORS configuration
- ✅ Input validation with Zod schemas
- ✅ SQL injection protection (Supabase parameterized queries)

### 5. Dependencies
```bash
# Check for vulnerabilities
npm audit

# Update all packages
npm update

# Check for outdated packages
npm outdated
```

---

## 🚨 Troubleshooting

### Common Issues

#### 1. "Module not found" errors
```bash
# Clear Next.js cache
rm -rf .next
npm install
npm run dev
```

#### 2. Supabase connection fails
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check network tab for CORS errors
- Ensure RLS policies allow access

#### 3. Wallet won't connect
- Check Phantom is installed and unlocked
- Clear browser cache and localStorage
- Try different browser (Chrome recommended)

#### 4. AI responses timeout
- Verify `OPENROUTER_API_KEY` is valid
- Check OpenRouter status: https://status.openrouter.ai
- Try different model (gpt-4o-mini is fastest)

#### 5. Streaming not working
- Ensure `Content-Type: text/event-stream` header
- Check browser supports SSE (all modern browsers do)
- Disable browser extensions that block streaming


```

---

## 📈 Roadmap & Future Features

### Q1 2026
- [ ] **Mobile App** (React Native with Expo)
- [ ] **Voice Interface** (Whisper API + ElevenLabs)
- [ ] **Advanced Charts** (TradingView widgets)
- [ ] **Portfolio Analytics** (P&L tracking, tax reports)

### Q2 2026
- [ ] **Multi-Chain Support** (Ethereum, Polygon, Arbitrum)
- [ ] **NFT Management** (View, send, list on Magic Eden)
- [ ] **Social Features** (Share trades, copy strategies)
- [ ] **Premium Tier** ($9.99/month - priority support, advanced tools)

### Q3 2026
- [ ] **Telegram Bot** (Chat with SOLPILOT on Telegram)
- [ ] **Browser Extension** (Quick access from any site)
- [ ] **API Platform** (Let devs integrate SOLPILOT)
- [ ] **White-Label Solution** (Custom-branded instances for protocols)

---

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

### 1. Fork & Clone
```bash
git clone https://github.com/your-username/solpilot.git
cd solpilot
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Follow existing code style
- Add tests for new features
- Update documentation

### 3. Commit with Conventional Commits
```bash
git commit -m "feat: add token price alerts"
git commit -m "fix: resolve streaming timeout issue"
git commit -m "docs: update README with new API endpoints"
```

### 4. Submit Pull Request
- Describe what changed and why
- Link related issues
- Request review from maintainers

### Contribution Guidelines
- **Code Quality**: Passes `npm run lint` and `npm run type-check`
- **Tests**: New features include tests
- **Documentation**: Update README if adding features
- **Commit Messages**: Follow Conventional Commits spec

---

## 📄 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)**.


