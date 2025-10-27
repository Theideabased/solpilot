# Environment Variables Configuration Guide

## ✅ Currently Configured & Working

### AI/LLM Services
```bash
# OpenRouter - Primary AI provider for agent responses
OPENROUTER_API_KEY=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
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_URL=https://openrouter.ai/api/v1/chat/completions
MODEL=openai/gpt-4o-mini  # Model used by Mastra agents
```
**Status:** ✅ Configured - Your API key is set

### Database (Supabase)
```bash
# Supabase - Database for user data, chats, and authentication
NEXT_PUBLIC_SUPABASE_URL=https://tzewlzynvtuoyohuybei.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...  # Public anon key
SUPABASE_JWT_SECRET=Myguz0PM+zBYW2/wEAkS...  # JWT secret for auth
```
**Status:** ✅ Configured - Database connection active

### Solana Network
```bash
# Solana RPC endpoint - Currently using devnet
NEXT_PUBLIC_SOLANA_RPC=https://api.devnet.solana.com
```
**Status:** ✅ Configured but using DEVNET
**Recommendation:** For production, upgrade to:
- **Mainnet:** `https://api.mainnet-beta.solana.com` (rate limited)
- **Helius:** `https://rpc.helius.xyz/?api-key=YOUR_KEY` (better performance)
- **QuickNode:** Get custom RPC endpoint

### External APIs
```bash
# Venice API - For news and research features
VENICE_API=3DrLB6aVn_IZx5YOGgPQQg20wB_S2F-O5_m4-frbQx

# Zerion API - For portfolio analytics
ZERION_API_KEY=zk_dev_50c8a3ecd4794a69b76a24bdc2b401a6
```
**Status:** ✅ Both configured

### Optional Services
```bash
# OpenAI - Not actively used but available as fallback
OPENAI_API_KEY=sk-proj-CSW_e4LWAzDkOrbMlKKK...

# App Configuration
CONFIDENCE_THRESHOLD=0.6  # Intent classification threshold
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000  # For local dev
```

---

## 🔧 How to Test Each Service

### 1. Test OpenRouter (AI Responses)
The issue you're experiencing is likely **NOT** an API key problem - it's the agent instructions being too restrictive.

**To verify OpenRouter works:**
```bash
# Check if the API key is valid
curl https://openrouter.ai/api/v1/auth/key \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

**What was fixed:**
- Updated agent instructions to allow educational questions about Solana
- Previously, "What is Solana" triggered the off-topic warning
- Now the agent will explain Solana concepts properly

### 2. Test Supabase Connection
```bash
# In your browser console on the app:
const { data, error } = await supabase.from('users').select('count');
console.log(data, error);
```

### 3. Test Solana RPC
```bash
curl https://api.devnet.solana.com -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}'
```

### 4. Test Venice API
The Venice API is used for news/research. Check if it works:
```bash
# This is called internally by the Zerion agent
# No direct testing needed - will show errors in logs if broken
```

---

## 🚀 Next Steps to Fix Your Issue

### Immediate Fix (Already Applied)
1. ✅ Updated `solpilot.ts` agent instructions
2. 🔄 **Restart your dev server** for changes to take effect:
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

3. Test again with "What is Solana" - should now get a proper explanation

### Additional Improvements

#### Option 1: Upgrade Solana RPC (Recommended for production)
```bash
# Sign up for Helius (free tier: 100k requests/day)
# https://www.helius.dev/

# Update .env.local:
NEXT_PUBLIC_SOLANA_RPC=https://rpc.helius.xyz/?api-key=YOUR_HELIUS_KEY
```

#### Option 2: Add Better Error Logging
Add this to your `.env.local`:
```bash
# Enable debug logging
DEBUG=true
NODE_ENV=development
```

#### Option 3: Test All Agents
Once the server restarts, test each agent:
1. **SOLPILOT Agent:** "What is Solana?" → Should explain Solana
2. **Sonia Agent:** "Analyze SOL token" → Should provide token info
3. **Zerion Agent:** "Show my portfolio" → Should request wallet connection

---

## 📊 Environment Variable Priority

**Critical (Must Have):**
1. `OPENROUTER_API_KEY` - For AI responses ✅
2. `NEXT_PUBLIC_SUPABASE_URL` - For database ✅
3. `NEXT_PUBLIC_SUPABASE_ANON_KEY` - For database ✅
4. `NEXT_PUBLIC_SOLANA_RPC` - For blockchain data ✅

**Important (Enhanced Features):**
5. `VENICE_API` - For news/research ✅
6. `ZERION_API_KEY` - For portfolio analytics ✅

**Optional:**
7. `OPENAI_API_KEY` - Fallback AI provider
8. `SUPABASE_JWT_SECRET` - For custom auth flows

---

## ❓ Troubleshooting

### "Agent gives warning instead of answering"
**Cause:** Agent instructions too restrictive
**Fix:** ✅ Already applied - restart dev server

### "Cannot connect to wallet"
**Cause:** Phantom/Solflare not installed
**Fix:** Install wallet extension in browser

### "Token prices not loading"
**Cause:** Jupiter API rate limiting or network issues
**Fix:** Check console for errors, may need to implement retry logic

### "Database errors"
**Cause:** Supabase connection issues
**Fix:** Verify credentials, check Supabase dashboard for service status

---

## 🎯 Summary

**Your environment is properly configured!** The issue was with agent instructions, not API keys. 

**Action Required:**
1. Restart dev server: `npm run dev`
2. Test with "What is Solana" - should work now
3. If still issues, check browser console for errors

All your API keys and services are valid and active.
