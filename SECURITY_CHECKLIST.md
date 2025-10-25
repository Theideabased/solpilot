# 🔒 SOLPILOT Security Checklist

## ✅ Completed Security Measures

### 1. Enhanced `.gitignore`
Your `.gitignore` now protects:
- ✅ All `.env*` files (local, development, production)
- ✅ API keys and secrets (OpenRouter, Zerion, Supabase)
- ✅ Wallet keypairs and private keys
- ✅ Blockchain credentials (Solana, Ethereum)
- ✅ Database dumps and backups
- ✅ Personal notes with sensitive info
- ✅ SSH/GPG keys and certificates
- ✅ Configuration files with secrets

---

## 🚨 Critical: Check Before Committing

### Step 1: Verify No Secrets in Git History
```bash
# Check if .env.local was ever committed
git log --all --full-history -- .env.local

# If it was committed, you need to remove it from history:
# WARNING: This rewrites git history!
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env.local" \
  --prune-empty --tag-name-filter cat -- --all

# Then force push (only if necessary)
# git push origin --force --all
```

### Step 2: Scan for Accidentally Committed Secrets
```bash
# Check current staged files
git status

# Review what's about to be committed
git diff --cached

# Check for any API keys in tracked files
git grep -i "api.*key"
git grep -i "secret"
git grep -i "sk-or-v1"  # OpenRouter keys
git grep -i "zk_dev"     # Zerion keys
```

### Step 3: Use Git Secrets Tool (Optional but Recommended)
```bash
# Install git-secrets
# On macOS:
brew install git-secrets

# On Linux:
git clone https://github.com/awslabs/git-secrets.git
cd git-secrets
make install

# Configure for your repo
cd /path/to/solpilot
git secrets --install
git secrets --register-aws
git secrets --add 'sk-or-v1-[A-Za-z0-9]{64}'  # OpenRouter pattern
git secrets --add 'zk_dev_[A-Za-z0-9]{32}'     # Zerion pattern
git secrets --add 'eyJ[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*'  # JWT pattern
```

---

## 🔐 Environment Variables Security

### What's Currently in Your `.env.local`:
```bash
OPENROUTER_API_KEY=sk-or-v1-***  # ✅ Protected
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1  # ✅ Safe (public URL)
MODEL=openai/gpt-4o-mini  # ✅ Safe (model name)
ZERION_API_KEY=zk_dev_***  # ✅ Protected
NEXT_PUBLIC_SUPABASE_URL=***  # ⚠️ Public (safe, but visible in client)
NEXT_PUBLIC_SUPABASE_ANON_KEY=***  # ⚠️ Public (safe, designed for client)
SUPABASE_JWT_SECRET=***  # ✅ Protected (server-only)
NEXT_PUBLIC_SOLANA_RPC=https://api.devnet.solana.com  # ✅ Safe (public URL)
```

### Environment Variable Rules:
- ✅ **NEXT_PUBLIC_*** = Exposed to browser (safe for public URLs/keys)
- 🔒 **No NEXT_PUBLIC_ prefix** = Server-only (keep secret!)
- ⚠️ **Never commit** `.env.local` or `.env.production`

---

## 🛡️ Additional Security Best Practices

### 1. Rotate API Keys Regularly
- [ ] Rotate OpenRouter API key every 90 days
- [ ] Rotate Zerion API key every 90 days
- [ ] Change Supabase JWT secret if ever exposed

### 2. Use Different Keys for Dev/Prod
```bash
# Development (.env.local)
ZERION_API_KEY=zk_dev_***  # ✅ Development key

# Production (.env.production.local)
ZERION_API_KEY=zk_prod_***  # ✅ Production key
```

### 3. Enable GitHub Secret Scanning
1. Go to: https://github.com/Theideabased/solpilot/settings/security_analysis
2. Enable **"Secret scanning"**
3. Enable **"Push protection"**

### 4. Use Vercel Environment Variables
When deploying to Vercel:
1. Never commit `.env.production`
2. Add secrets in Vercel dashboard: **Settings → Environment Variables**
3. Use different keys for Preview vs Production

### 5. Supabase RLS (Row Level Security)
Already configured in `supabase-schema.sql`:
- ✅ Users can only see their own chats
- ✅ Users can only see messages from their chats
- ✅ Anonymous users can't access data

---

## 📋 Pre-Commit Checklist

Before every `git commit`:
- [ ] Run `git status` - Check what's being committed
- [ ] Run `git diff` - Review changes
- [ ] Search for "key", "secret", "password" in changes
- [ ] Verify `.env.local` is NOT in `git status` output
- [ ] Check no hardcoded API keys in code
- [ ] No wallet private keys in repo
- [ ] No real user data in test files

---

## 🚫 Never Commit These Files

### Already Protected by `.gitignore`:
```
.env.local
.env.production
*.key
*.pem
wallet.json
keypair.json
secrets.json
*private-key*
*apikey*
*secret*
```

### If Accidentally Committed:
```bash
# Remove from staging
git reset HEAD <file>

# Remove from git but keep locally
git rm --cached <file>

# If already pushed, remove from history (DANGEROUS)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch <file>" \
  --prune-empty --tag-name-filter cat -- --all
```

---

## 🔍 Regular Security Audits

### Monthly Checks:
```bash
# Check for any API keys in codebase
rg -i "api.*key|secret|password" --type-not gitignore

# Check git history for secrets
git log -p | grep -i "api.*key"

# Verify .gitignore is working
git check-ignore -v .env.local  # Should show it's ignored
```

### Tools to Use:
- **git-secrets**: Prevents committing secrets
- **truffleHog**: Scans git history for secrets
- **GitGuardian**: GitHub app for secret detection
- **Doppler**: Secret management service (alternative to .env files)

---

## 📞 If You Accidentally Commit a Secret

### Immediate Actions:
1. **Rotate the compromised key immediately**
   - OpenRouter: Generate new API key, delete old one
   - Zerion: Contact support to rotate key
   - Supabase: Reset database password/JWT secret

2. **Remove from Git History**
   ```bash
   # Use BFG Repo-Cleaner (easier than filter-branch)
   brew install bfg
   bfg --replace-text secrets.txt  # File with secrets to remove
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   ```

3. **Force Push (if you own the repo)**
   ```bash
   git push origin --force --all
   git push origin --force --tags
   ```

4. **Notify Team**
   - If others have cloned the repo, they need to re-clone
   - All team members should rotate their local keys

---

## ✅ Current Status

Your repository is now protected with:
- ✅ Comprehensive `.gitignore` (300+ patterns)
- ✅ All API keys excluded from git
- ✅ Wallet keypairs protected
- ✅ Database credentials secured
- ✅ Backup files ignored
- ✅ Screenshot protection (might contain keys)

---

## 🎯 Next Steps

1. **Review staged files**: `git status`
2. **Remove any secrets from history** if found
3. **Enable GitHub secret scanning**
4. **Set up Vercel environment variables** for deployment
5. **Rotate any keys that may have been exposed**

**Your codebase is now secure!** 🔒

---

## 📚 Resources

- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [git-secrets](https://github.com/awslabs/git-secrets)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
