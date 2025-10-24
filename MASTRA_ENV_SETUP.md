# Required Environment Variables for Mastra Integration

Copy these to your `.env.local` file:

```bash
# ============================================
# REQUIRED: OpenRouter Configuration
# ============================================
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_URL=https://openrouter.ai/api/v1/chat/completions
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
MODEL=anthropic/claude-3.5-sonnet

# ============================================
# REQUIRED: Zerion API (Portfolio & Transaction Data)
# ============================================
ZERION_API_KEY=your_zerion_api_key_here
# Get your free key at: https://zerion-io.typeform.com/to/QI3GRa7t?utm_source=cypherpunk

# ============================================
# REQUIRED: Solana Configuration
# ============================================
NEXT_PUBLIC_SOLANA_RPC=https://api.devnet.solana.com
# For mainnet use: https://api.mainnet-beta.solana.com

# ============================================
# REQUIRED: Supabase (Database)
# ============================================
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_JWT_SECRET=your_jwt_secret

# ============================================
# OPTIONAL: Venice API (for research agent)
# ============================================
VENICE_API=your_venice_api_key_here
# Note: With Zerion, Venice is optional

# ============================================
# OPTIONAL: Other Settings
# ============================================
CONFIDENCE_THRESHOLD=0.7
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

## How to Get API Keys

### 1. Zerion API Key (REQUIRED) 🔑
**Purpose:** Portfolio tracking, transaction history, PnL analysis, DeFi positions across Solana + 25 EVM chains

1. Go to https://zerion-io.typeform.com/to/QI3GRa7t?utm_source=cypherpunk
2. Fill out the form with your project details
3. You'll receive a **FREE Developer plan** API key via email
4. Copy and paste into `ZERION_API_KEY`

**What you get with free plan:**
- 3,000 requests/day
- 2 RPS limit
- Local development support
- Access to all endpoints:
  - Portfolio & balances
  - Transaction history
  - PnL tracking
  - DeFi positions
  - NFT holdings
  - Token prices

### 2. OpenRouter API Key (REQUIRED) 🤖
1. Go to https://openrouter.ai
2. Sign up or log in
3. Navigate to Keys section
4. Create a new API key
5. Copy and paste into `OPENROUTER_API_KEY`

**Models you can use:**
- `anthropic/claude-3.5-sonnet` (Recommended)
- `openai/gpt-4-turbo`
- `google/gemini-pro`
- `meta-llama/llama-3.1-70b-instruct`

### 3. Supabase Credentials (REQUIRED) 🗄️
1. Go to https://supabase.com
2. Create a new project
3. Go to Project Settings → API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon/Public Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Go to Project Settings → Auth
6. Copy JWT Secret → `SUPABASE_JWT_SECRET`

### 4. Venice API Key (OPTIONAL) 🔍
1. Go to https://venice.ai
2. Sign up for API access
3. Get your API key
4. Copy to `VENICE_API`

**Note:** With Zerion integration, Venice is optional as Zerion provides comprehensive onchain data.

## Testing Your Configuration

After adding the environment variables, run:

```bash
# Install dependencies (if not done)
npm install

# Start the development server
npm run dev

# In another terminal, start the MCP server
npm run mcp:dev
```

Then test by sending messages:
- "What's my balance?" (tests Solana connection)
- "Show my portfolio for [address]" (tests Zerion integration)
- "What's my PnL?" (tests Zerion PnL tracking)
- "Show recent transactions" (tests Zerion transaction history)
- "Hello" (tests OpenRouter/Mastra)

## Troubleshooting

### Error: ZERION_API_KEY not configured
- Make sure `ZERION_API_KEY` is set in `.env.local`
- Get your free key at https://zerion-io.typeform.com/to/QI3GRa7t?utm_source=cypherpunk
- Restart the dev server after adding the key

### Error: OpenRouter API key not configured
- Make sure `OPENROUTER_API_KEY` is set in `.env.local`
- Restart the dev server after adding the key

### Error: Solana RPC connection failed
- Check if `NEXT_PUBLIC_SOLANA_RPC` is correct
- Try using devnet: `https://api.devnet.solana.com`
- Or mainnet: `https://api.mainnet-beta.solana.com`

### Error: Database connection failed
- Verify all three Supabase variables are set
- Check if Supabase project is active
- Ensure database tables are created (see main README.md)

### Rate limit errors
- OpenRouter has rate limits on free tier
- Zerion free plan: 3,000 requests/day
- Consider upgrading your plan for production use
- The app has fallback error handling

## Minimum Required for Testing

If you just want to test the core functionality:

```bash
OPENROUTER_API_KEY=sk-or-v1-xxx
MODEL=anthropic/claude-3.5-sonnet
ZERION_API_KEY=zerion_xxx
NEXT_PUBLIC_SOLANA_RPC=https://api.devnet.solana.com
```

This will let you:
- Chat with SOLPILOT agent ✅
- Use Solana tools ✅
- Access Zerion portfolio data ✅
- Test agent routing ✅

For full functionality (chat history, user accounts), you'll need Supabase.
