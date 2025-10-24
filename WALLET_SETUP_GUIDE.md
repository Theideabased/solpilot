# 🔐 Wallet Connection & Chat Setup Guide

## ✅ All Fixes Applied

### Fixed Issues:
1. ✅ **Chat API** - Now accepts `walletAddress`, `solanaAddress`, or `injectiveAddress`
2. ✅ **System User** - Automatically creates `SYSTEM_AI_ADDRESS` for AI responses
3. ✅ **Nonce Route** - Fixed syntax error (`.eq("wallet_address", address)`)
4. ✅ **Early Access** - Re-enabled to require wallet connection
5. ✅ **Logging** - Added detailed console logs to track requests

---

## 🚀 How to Test (Step-by-Step)

### Step 1: Open the App
```bash
# App is running at:
http://localhost:3000
```

### Step 2: You'll See the Early Access Page
The app now requires wallet connection before chatting.

### Step 3: Connect Your Wallet
1. Click **"Connect Phantom"** or **"Connect Solflare"**
2. Approve the connection in your wallet extension
3. The app will:
   - Create your user account in Supabase
   - Generate a nonce for authentication
   - Sign a message to prove ownership
   - Store your JWT token in localStorage

### Step 4: Check Whitelist Status
After connecting, the app checks if your wallet is whitelisted:
- If **whitelisted**: You'll see the chat interface ✅
- If **not whitelisted**: You'll see the early access form

### Step 5: Get Whitelisted (Two Options)

#### Option A: Manual Whitelist (Recommended for Testing)
Go to your Supabase dashboard:
1. Open **Table Editor** → **users** table
2. Find your wallet address
3. Set `is_whitelisted` = `true`
4. Refresh the app

#### Option B: Join via Referral Code
1. Enter a referral code in the form
2. Click "Join Early Access Program"
3. Your account will be created with `is_whitelisted = true`

### Step 6: Start Chatting!
Once whitelisted, you can:
- Send messages to the AI
- Test Zerion integration: "Show my portfolio"
- Test Solana features: "What's my SOL balance?"

---

## 🔍 Monitoring & Debugging

### Check Server Logs
The terminal will show detailed logs:
```
📥 POST /api/chats received body: { "title": "...", "walletAddress": "..." }
🔍 Looking for user with wallet: 9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM
👤 User lookup result: { userData: {...}, userError: null }
🤖 System user found with ID: abc123
💬 Creating chat with: { ai_id: "abc123", user_id: "xyz789", title: "..." }
✅ Chat created successfully
```

### Common Errors & Solutions

#### ❌ "Missing wallet address"
**Cause:** Wallet not connected before sending message  
**Solution:** Connect wallet first, then try again

#### ❌ "User not found"
**Cause:** Wallet connected but user not in database  
**Solution:** Check Supabase `users` table, manually add if needed

#### ❌ "System user not found"
**Cause:** `SYSTEM_AI_ADDRESS` user doesn't exist  
**Solution:** API will auto-create on first chat, or manually create:
```sql
INSERT INTO users (wallet_address, is_whitelisted) 
VALUES ('SYSTEM_AI_ADDRESS', true);
```

---

## 🗄️ Database Structure

### Users Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `wallet_address` | TEXT | Solana public key |
| `is_whitelisted` | BOOLEAN | Access control |
| `nonce` | TEXT | For signature verification |
| `referral_code` | TEXT | Optional referral |
| `created_at` | TIMESTAMP | Account creation |

### Chats Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | FK to users table |
| `ai_id` | UUID | FK to users table (system) |
| `title` | TEXT | Chat title |
| `created_at` | TIMESTAMP | Chat creation |

---

## 🧪 Testing Checklist

- [ ] Open http://localhost:3000
- [ ] See Early Access page
- [ ] Click "Connect Phantom" or "Connect Solflare"
- [ ] Approve wallet connection
- [ ] Check terminal for "✅ Wallet Connected!"
- [ ] Verify whitelist status (manually set to true in Supabase if needed)
- [ ] See chat interface
- [ ] Send test message: "Hello!"
- [ ] Check terminal logs show:
  - `📥 POST /api/chats received body`
  - `✅ Chat created successfully`
- [ ] See AI response
- [ ] Test Zerion: "Show my portfolio"
- [ ] Test Solana: "What's my SOL balance?"

---

## 🎯 Next Steps

### For Development:
1. Test all features with connected wallet
2. Test Zerion API integration
3. Test Mastra multi-agent routing

### For Production:
1. Remove test whitelists
2. Implement referral code system
3. Add payment integration for EAP
4. Deploy to Vercel/Netlify

---

## 💡 Pro Tips

### Bypass Whitelist for Testing
To temporarily allow all users without whitelist check:

```typescript
// app/page.tsx line ~40
const [isWhitelisted, setIsWhitelisted] = useState<boolean>(true); // Always true
```

Then comment out the check:
```typescript
// if (!solanaAddress || !isWhitelisted) {
//   return;
// }
```

### Test with Multiple Wallets
Create test accounts in Supabase:
```sql
INSERT INTO users (wallet_address, is_whitelisted) VALUES
('9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM', true),
('TestWallet1111111111111111111111111111111', true),
('TestWallet2222222222222222222222222222222', true);
```

### Debug Supabase Queries
Check real-time query logs in Supabase dashboard:
- Go to **Settings** → **API**
- Click **View logs**
- See all INSERT/SELECT/UPDATE queries

---

## 📞 Support

If you encounter issues:
1. Check terminal logs for detailed error messages
2. Check browser console (F12) for client-side errors
3. Check Supabase dashboard for database errors
4. Review this guide's troubleshooting section

**Current Status:** ✅ All systems ready, waiting for wallet connection!
