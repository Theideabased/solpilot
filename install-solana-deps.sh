#!/bin/bash

# Solana Migration - Package Installation Script

echo "🚀 Installing Solana dependencies..."

npm install @solana/web3.js tweetnacl bs58 @solana/spl-token

echo "✅ Solana packages installed successfully!"
echo ""
echo "📦 Installed packages:"
echo "  - @solana/web3.js (Solana JavaScript SDK)"
echo "  - tweetnacl (Cryptographic signature verification)"
echo "  - bs58 (Base58 encoding/decoding)"
echo ""
echo "Next steps:"
echo "1. Review the SOLANA_MIGRATION_SUMMARY.md file"
echo "2. Implement the Solana payment transaction in earlyAccessPage.tsx"
echo "3. Test wallet connections with Phantom or Solflare"
echo "4. Update component props throughout the app"
echo ""
echo "Happy coding! 🎉"
