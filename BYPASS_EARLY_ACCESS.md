# Bypass Early Access for Testing

During development, you may want to bypass the Early Access modal to test the main app interface.

## Option 1: Temporarily Disable the Modal

Edit `/home/user/Documents/solpilot/app/page.tsx` line 203:

```tsx
// Change this:
{!isWhitelisted && (

// To this (always false, so modal never shows):
{false && (
```

This will hide the modal and let you access the app immediately.

## Option 2: Set isWhitelisted to true by default

Edit `/home/user/Documents/solpilot/app/page.tsx` line 39:

```tsx
// Change this:
const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);

// To this:
const [isWhitelisted, setIsWhitelisted] = useState<boolean>(true);
```

This makes the app think you're always whitelisted.

## Option 3: Whitelist your wallet in the database

If you have database access, add your wallet address to the users table with `is_whitelisted = true`.

## Option 4: Complete the Early Access flow

1. Connect wallet
2. Click "Join Early Access (0.1 SOL)"
3. Complete the Solana payment transaction (when implemented)
4. Backend will whitelist you automatically

---

**Recommendation for testing:** Use Option 1 or 2 to quickly test features without dealing with the early access system.
