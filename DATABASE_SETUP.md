# 🗄️ SOLPILOT Database Setup Guide

## Issue Identified
```
Error: Could not find the table 'public.users' in the schema cache
```

This means your Supabase database doesn't have the required tables yet.

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on **"SQL Editor"** in the left sidebar
4. Click **"New query"**

### Step 2: Run the Schema Script

1. Open the file: `supabase-schema.sql` in your project
2. Copy the **entire contents**
3. Paste it into the Supabase SQL Editor
4. Click **"Run"** (or press Ctrl/Cmd + Enter)

### Step 3: Verify Success

You should see:
```
Success. No rows returned
```

Run this verification query:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'chats', 'messages');
```

You should see 3 tables:
- ✅ users
- ✅ chats  
- ✅ messages

### Step 4: Verify System User

Run this query:
```sql
SELECT * FROM public.users WHERE wallet_address = 'SYSTEM_AI_ADDRESS';
```

You should see 1 row with `is_whitelisted = true`

---

## 📊 Database Schema Overview

### **Users Table**
Stores wallet addresses and authentication data:
```
- id: UUID (primary key)
- wallet_address: TEXT (unique, Solana public key)
- is_whitelisted: BOOLEAN (access control)
- nonce: TEXT (for signature verification)
- referral_code: TEXT (optional)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### **Chats Table**
Stores conversation sessions:
```
- id: UUID (primary key)
- user_id: UUID (foreign key → users)
- ai_id: UUID (foreign key → users, the AI system user)
- title: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### **Messages Table**
Stores individual messages:
```
- id: UUID (primary key)
- chat_id: UUID (foreign key → chats)
- sender_id: UUID (foreign key → users)
- message: JSONB (full message object with type, text, metadata)
- created_at: TIMESTAMP
```

---

## 🔒 Security Features

### Row Level Security (RLS)
All tables have RLS enabled with policies:

**Users:**
- Public access allowed (needed for wallet authentication)

**Chats:**
- Users can only see their own chats
- Users can create new chats
- Users can update/delete their own chats

**Messages:**
- Users can only see messages from their chats
- Users can create messages in their chats

### Indexes
Optimized for fast queries:
- Wallet address lookups
- Chat history retrieval
- Message threading

---

## 🧪 Testing the Database

### 1. Create a Test User
```sql
INSERT INTO public.users (wallet_address, is_whitelisted)
VALUES ('9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM', true)
RETURNING *;
```

### 2. Create a Test Chat
```sql
-- First, get the user IDs
SELECT id, wallet_address FROM public.users 
WHERE wallet_address IN ('9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM', 'SYSTEM_AI_ADDRESS');

-- Then create a chat (replace UUIDs with actual IDs from above)
INSERT INTO public.chats (user_id, ai_id, title)
VALUES (
  (SELECT id FROM public.users WHERE wallet_address = '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM'),
  (SELECT id FROM public.users WHERE wallet_address = 'SYSTEM_AI_ADDRESS'),
  'Test Chat'
)
RETURNING *;
```

### 3. Add a Test Message
```sql
-- Replace chat_id and sender_id with actual UUIDs
INSERT INTO public.messages (chat_id, sender_id, message)
VALUES (
  'YOUR_CHAT_ID_HERE',
  (SELECT id FROM public.users WHERE wallet_address = '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM'),
  '{"type": "text", "text": "Hello from test!", "sender": "user"}'::jsonb
)
RETURNING *;
```

---

## 🔄 After Setup

### Restart Your App
```bash
# The server will automatically detect the new tables
# Just refresh your browser at http://localhost:3000
```

### Connect Your Wallet
1. Open http://localhost:3000
2. Click "Connect Phantom" or "Connect Solflare"
3. Approve the connection
4. Your wallet address will be automatically added to the `users` table

### Whitelist Your Wallet
```sql
-- In Supabase SQL Editor, run:
UPDATE public.users 
SET is_whitelisted = true 
WHERE wallet_address = 'YOUR_WALLET_ADDRESS_HERE';
```

### Start Chatting!
Now you can send messages and they'll be stored in the database.

---

## 📈 Monitoring & Maintenance

### View All Users
```sql
SELECT wallet_address, is_whitelisted, created_at 
FROM public.users 
ORDER BY created_at DESC;
```

### View Recent Chats
```sql
SELECT * FROM public.chat_overview 
ORDER BY last_message_at DESC 
LIMIT 10;
```

### Clear Test Data (Optional)
```sql
-- WARNING: This deletes all data except the system user
DELETE FROM public.messages;
DELETE FROM public.chats;
DELETE FROM public.users WHERE wallet_address != 'SYSTEM_AI_ADDRESS';
```

---

## 🐛 Troubleshooting

### Error: "relation 'public.users' does not exist"
**Solution:** Run the schema script again in Supabase SQL Editor

### Error: "duplicate key value violates unique constraint"
**Solution:** The system user already exists, this is fine. Just continue.

### Error: "permission denied for table users"
**Solution:** Check RLS policies in Supabase → Authentication → Policies

### Can't see tables in Table Editor
**Solution:** 
1. Go to Supabase → Table Editor
2. Click refresh icon
3. Tables should appear: users, chats, messages

---

## 🎯 Next Steps

After database setup:
1. ✅ Connect your wallet at http://localhost:3000
2. ✅ Whitelist your wallet in Supabase
3. ✅ Test sending a message
4. ✅ Check the `chats` and `messages` tables to see your data
5. ✅ Test Zerion integration: "Show my portfolio"
6. ✅ Test Solana features: "What's my SOL balance?"

---

## 💾 Backup & Export

### Export Schema
In Supabase SQL Editor:
```sql
-- This shows you the current schema
SELECT * FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Backup Data
```sql
-- Export all users
COPY (SELECT * FROM public.users) TO STDOUT WITH CSV HEADER;

-- Export all chats
COPY (SELECT * FROM public.chats) TO STDOUT WITH CSV HEADER;

-- Export all messages
COPY (SELECT * FROM public.messages) TO STDOUT WITH CSV HEADER;
```

---

## 📞 Support

If you still have issues:
1. Check Supabase logs: Dashboard → Logs → Postgres Logs
2. Verify your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
3. Make sure you're using the correct Supabase project

**Current Status:** Ready to run the schema script! 🚀
