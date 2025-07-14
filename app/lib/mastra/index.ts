import { Mastra } from '@mastra/core';
import { createOllama } from 'ollama-ai-provider';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { Agent } from '@mastra/core/agent';

// Create a dynamic model provider based on the current provider settings
export function createMastraModel(provider: string, model: string, apiKeys: Record<string, string>, baseUrls?: Record<string, string>) {
  console.log(`Creating Mastra model - Provider: ${provider}, Model: ${model}, API Keys:`, Object.keys(apiKeys));
  
  // Debug: Check actual API key values
  if (provider.toLowerCase() === 'google') {
    console.log(`Google API key value exists: ${!!apiKeys.GOOGLE_GENERATIVE_AI_API_KEY}`);
    console.log(`Google API key length: ${apiKeys.GOOGLE_GENERATIVE_AI_API_KEY?.length || 0}`);
    if (apiKeys.Google) {
      console.log(`Original Google key exists: ${!!apiKeys.Google}, length: ${apiKeys.Google.length}`);
    }
  }
  
  switch (provider.toLowerCase()) {
    case 'openai':
      return openai(model, {
        apiKey: apiKeys.OPENAI_API_KEY,
        baseURL: baseUrls?.OPENAI_API_BASE_URL,
      });
    
    case 'anthropic':
      return anthropic(model, {
        apiKey: apiKeys.ANTHROPIC_API_KEY,
        baseURL: baseUrls?.ANTHROPIC_API_BASE_URL,
      });
    
    case 'google':
      // Try multiple possible API key sources
      const googleApiKey = apiKeys.GOOGLE_GENERATIVE_AI_API_KEY || apiKeys.Google || apiKeys.google;
      
      console.log(`Google API key debug:`, {
        fromGOOGLE_GENERATIVE_AI_API_KEY: !!apiKeys.GOOGLE_GENERATIVE_AI_API_KEY,
        fromGoogle: !!apiKeys.Google,
        fromgoogle: !!apiKeys.google,
        finalKey: !!googleApiKey,
        keyLength: googleApiKey?.length || 0,
        actualKey: googleApiKey ? `${googleApiKey.substring(0, 10)}...` : 'none'
      });
      
      if (!googleApiKey) {
        throw new Error('Google API key is required but not found in any expected format');
      }
      
      // Create Google provider with the API key
      const googleAI = createGoogleGenerativeAI({
        apiKey: googleApiKey,
        baseURL: baseUrls?.GOOGLE_API_BASE_URL,
      });
      
      console.log(`Google provider created successfully with model: ${model}`);
      
      return googleAI(model);
    
    case 'ollama':
      return createOllama({
        baseURL: baseUrls?.OLLAMA_API_BASE_URL || 'http://localhost:11434/api',
      }).chat(model);
    
    default:
      console.warn(`Unknown provider: ${provider}, falling back to OpenAI compatible`);
      // Default to OpenAI compatible
      return openai(model, {
        apiKey: apiKeys.OPENAI_API_KEY || apiKeys.OPENAI_LIKE_API_KEY,
        baseURL: baseUrls?.OPENAI_LIKE_API_BASE_URL || baseUrls?.OPENAI_API_BASE_URL,
      });
  }
}

// Create the main Mastra bolt agent
export function createBoltAgent(provider: string, model: string, apiKeys: Record<string, string>, baseUrls?: Record<string, string>) {
  const agentModel = createMastraModel(provider, model, apiKeys, baseUrls);
  
  return new Agent({
    name: 'Bolt AI Assistant',
    instructions: `You are Bolt, an AI-powered web development assistant. You excel at:

1. **Code Generation & Editing**: Creating, modifying, and optimizing code across multiple languages and frameworks
2. **Web Development**: Building modern web applications with React, Vue, Angular, and other frameworks
3. **Full-Stack Development**: Working with both frontend and backend technologies
4. **Problem Solving**: Debugging issues, suggesting improvements, and implementing solutions
5. **Project Structure**: Organizing code, managing dependencies, and following best practices

Key capabilities:
- Generate complete, functional code
- Edit existing files with precision
- Install and manage dependencies
- Create and modify project structures
- Provide detailed explanations for your work
- Follow modern development best practices

When working on code:
- Always provide complete, runnable code
- Include proper error handling
- Use modern syntax and patterns
- Add clear comments for complex logic
- Consider performance and maintainability
- Ensure code is properly structured and organized

You can work with any web technology stack and help with both simple scripts and complex applications.`,
    model: agentModel,
  });
}

// Create the Mastra instance
export function createMastraInstance(agents: Record<string, Agent>) {
  return new Mastra({
    agents,
  });
}
