// Simple test script to verify Mastra Google integration
const { mastraService } = require('./app/lib/mastra/service.ts');

async function testGoogle() {
  try {
    // Test with a dummy API key to see what happens
    const result = await mastraService.generateText({
      provider: 'Google',
      model: 'gemini-2.0-flash',
      apiKeys: {
        'Google': 'test-api-key-123' // Dummy key for testing
      },
      system: 'You are a helpful assistant',
      messages: [
        {
          role: 'user',
          content: 'Hello, test message'
        }
      ]
    });
    
    console.log('Success:', result);
  } catch (error) {
    console.log('Error:', error.message);
  }
}

testGoogle();
