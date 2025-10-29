/**
 * Test script for Solana tools
 * Run with: npx tsx test-tools.ts
 */

import { createSolanaTools } from './mastra/tools/solana-tools';
import { createCoinGeckoTools } from './mastra/tools/coingecko';

async function testTools() {
  console.log('🧪 Testing Solana Tools...\n');

  const solanaTools = createSolanaTools();
  const coinGeckoTools = createCoinGeckoTools();

  // Test 1: Fetch SOL Price
  console.log('1️⃣ Testing fetchTokenPrice for SOL...');
  try {
    const priceResult = await solanaTools.fetchTokenPrice.execute({
      context: { token: 'SOL' }
    });
    console.log('✅ Result:', JSON.stringify(priceResult, null, 2));
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n---\n');

  // Test 2: Fetch Auction Info
  console.log('2️⃣ Testing fetchAuction...');
  try {
    const auctionResult = await solanaTools.fetchAuction.execute({
      context: {}
    });
    console.log('✅ Result:', JSON.stringify(auctionResult.data, null, 2));
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n---\n');

  // Test 3: Get Solana Token List
  console.log('3️⃣ Testing CoinGecko getSolanaTokenList (top 5)...');
  try {
    const tokenListResult = await coinGeckoTools.getTokenList.execute({
      context: { perPage: 5, page: 1, sortBy: 'market_cap' }
    });
    if (tokenListResult.success) {
      console.log('✅ Found', tokenListResult.data.tokens.length, 'tokens:');
      tokenListResult.data.tokens.forEach((token: any, i: number) => {
        console.log(`   ${i+1}. ${token.symbol} (${token.name}) - $${token.price}`);
      });
    } else {
      console.error('❌ Failed:', tokenListResult.error);
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n---\n');

  // Test 4: Get Solana Network Stats
  console.log('4️⃣ Testing getSolanaNetworkStats...');
  try {
    const statsResult = await coinGeckoTools.getNetworkStats.execute({
      context: {}
    });
    if (statsResult.success) {
      console.log('✅ Solana Stats:');
      console.log(`   Price: $${statsResult.data.price.usd}`);
      console.log(`   24h Change: ${statsResult.data.price.change24h.toFixed(2)}%`);
      console.log(`   Market Cap: $${(statsResult.data.market.marketCap / 1e9).toFixed(2)}B`);
      console.log(`   Rank: #${statsResult.data.market.marketCapRank}`);
    } else {
      console.error('❌ Failed:', statsResult.error);
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n✅ Tests complete!');
}

testTools().catch(console.error);
