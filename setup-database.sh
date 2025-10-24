#!/bin/bash

# SOLPILOT Database Setup Script
# This script helps you set up the Supabase database schema

echo "🗄️  SOLPILOT Database Setup"
echo "================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local file not found"
    echo "Please create .env.local with your Supabase credentials"
    exit 1
fi

# Extract Supabase URL and Key from .env.local
SUPABASE_URL=$(grep NEXT_PUBLIC_SUPABASE_URL .env.local | cut -d '=' -f2)
SUPABASE_KEY=$(grep NEXT_PUBLIC_SUPABASE_ANON_KEY .env.local | cut -d '=' -f2)

if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_KEY" ]; then
    echo "❌ Error: Could not find Supabase credentials in .env.local"
    echo "Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
    exit 1
fi

echo "✅ Found Supabase credentials"
echo "   URL: $SUPABASE_URL"
echo ""

# Extract project ID from URL
PROJECT_ID=$(echo $SUPABASE_URL | sed 's|https://||' | cut -d'.' -f1)
echo "📍 Project ID: $PROJECT_ID"
echo ""

echo "📋 Next Steps:"
echo "================================"
echo ""
echo "Option 1: Manual Setup (Recommended)"
echo "-----------------------------------"
echo "1. Go to: https://supabase.com/dashboard/project/$PROJECT_ID/editor"
echo "2. Click 'SQL Editor' → 'New query'"
echo "3. Copy the contents of 'supabase-schema.sql'"
echo "4. Paste and click 'Run'"
echo ""
echo "Option 2: Use Supabase CLI"
echo "-----------------------------------"
echo "1. Install Supabase CLI: npm install -g supabase"
echo "2. Login: supabase login"
echo "3. Link project: supabase link --project-ref $PROJECT_ID"
echo "4. Run migration: supabase db push"
echo ""

# Ask user which method they prefer
echo "Which method would you like to use?"
echo "1) Open Supabase dashboard (manual)"
echo "2) Try Supabase CLI (if installed)"
echo "3) Show me the SQL to copy"
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🌐 Opening Supabase dashboard..."
        echo "Opening: https://supabase.com/dashboard/project/$PROJECT_ID/editor"
        
        # Try to open browser (works on most systems)
        if command -v xdg-open &> /dev/null; then
            xdg-open "https://supabase.com/dashboard/project/$PROJECT_ID/editor"
        elif command -v open &> /dev/null; then
            open "https://supabase.com/dashboard/project/$PROJECT_ID/editor"
        else
            echo "Please manually open the URL above in your browser"
        fi
        
        echo ""
        echo "📋 Next:"
        echo "1. Click 'New query' in the SQL Editor"
        echo "2. Copy the contents of: supabase-schema.sql"
        echo "3. Paste and click 'Run'"
        ;;
    
    2)
        echo ""
        if command -v supabase &> /dev/null; then
            echo "✅ Supabase CLI found"
            echo "📝 Creating migration file..."
            
            mkdir -p supabase/migrations
            cp supabase-schema.sql supabase/migrations/$(date +%Y%m%d%H%M%S)_initial_schema.sql
            
            echo "🔗 Linking to project..."
            supabase link --project-ref $PROJECT_ID
            
            echo "🚀 Pushing to database..."
            supabase db push
            
            echo ""
            echo "✅ Database setup complete!"
        else
            echo "❌ Supabase CLI not found"
            echo "Install it with: npm install -g supabase"
            echo "Then run this script again"
        fi
        ;;
    
    3)
        echo ""
        echo "📋 Copy this SQL and run it in Supabase SQL Editor:"
        echo "================================"
        cat supabase-schema.sql
        echo "================================"
        echo ""
        echo "🌐 Supabase SQL Editor:"
        echo "https://supabase.com/dashboard/project/$PROJECT_ID/editor"
        ;;
    
    *)
        echo "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "✅ Setup instructions provided!"
echo ""
echo "After running the SQL:"
echo "1. Restart your app (if running)"
echo "2. Connect your wallet at http://localhost:3000"
echo "3. Whitelist your wallet in Supabase Table Editor"
echo ""
echo "For detailed instructions, see: DATABASE_SETUP.md"
