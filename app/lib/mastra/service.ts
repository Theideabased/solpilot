import { createBoltAgent, createMastraInstance } from './index';
import type { IProviderSetting } from '~/types/model';
import { createScopedLogger } from '~/utils/logger';

// Define Message type to maintain compatibility
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  id?: string;
}

const logger = createScopedLogger('mastra-service');

export interface MastraServiceOptions {
  provider: string;
  model: string;
  apiKeys: Record<string, string>;
  providerSettings?: Record<string, IProviderSetting>;
  system?: string;
}

/**
 * Service that bridges the existing bolt.new system with Mastra agents
 * This maintains all existing functionality while using Mastra under the hood
 */
export class MastraService {
  private static instance: MastraService;
  private agentCache = new Map<string, any>();

  static getInstance(): MastraService {
    if (!MastraService.instance) {
      MastraService.instance = new MastraService();
    }
    return MastraService.instance;
  }

  private getCacheKey(options: MastraServiceOptions): string {
    return `${options.provider}-${options.model}`;
  }

  private getBaseUrls(providerSettings?: Record<string, IProviderSetting>): Record<string, string> {
    const baseUrls: Record<string, string> = {};
    
    if (providerSettings) {
      Object.entries(providerSettings).forEach(([key, setting]) => {
        if (setting.baseUrl) {
          baseUrls[`${key.toUpperCase()}_API_BASE_URL`] = setting.baseUrl;
        }
      });
    }
    
    return baseUrls;
  }

  /**
   * Check if we have a valid API key for the given provider
   */
  private hasValidApiKey(provider: string, apiKeys: Record<string, string>): boolean {
    const mappedKeys = this.mapApiKeys(apiKeys);
    
    const requiredKeys: Record<string, string[]> = {
      'OpenAI': ['OPENAI_API_KEY'],
      'Anthropic': ['ANTHROPIC_API_KEY'],
      'Google': ['GOOGLE_GENERATIVE_AI_API_KEY'],
      'Together': ['TOGETHER_API_KEY'],
      'AmazonBedrock': ['AWS_ACCESS_KEY_ID'], // AWS might need more keys but this is primary
      'Github': ['GITHUB_API_KEY'],
    };

    const required = requiredKeys[provider];
    if (!required) return false; // Unknown provider
    
    return required.some(key => mappedKeys[key] && mappedKeys[key].trim().length > 0);
  }

  /**
   * Map UI API key names to Mastra environment variable names
   */
  private mapApiKeys(apiKeys: Record<string, string>): Record<string, string> {
    const mappedKeys: Record<string, string> = {};
    
    // Create a mapping from UI key names to expected environment variable names
    const keyMapping: Record<string, string> = {
      'OpenAI': 'OPENAI_API_KEY',
      'Anthropic': 'ANTHROPIC_API_KEY',
      'Google': 'GOOGLE_GENERATIVE_AI_API_KEY',
      'Ollama': 'OLLAMA_API_KEY',
      'Together': 'TOGETHER_API_KEY',
      'AmazonBedrock': 'AWS_ACCESS_KEY_ID', // or appropriate mapping
      'Github': 'GITHUB_API_KEY',
    };

    // Map the keys
    Object.entries(apiKeys).forEach(([uiKey, value]) => {
      const envKey = keyMapping[uiKey] || uiKey; // fallback to original key if no mapping
      mappedKeys[envKey] = value;
      
      // Also preserve the original key for backward compatibility
      mappedKeys[uiKey] = value;
      
      // Special handling for Google keys - ensure all possible variations
      if (uiKey === 'Google' || uiKey === 'google') {
        mappedKeys['GOOGLE_GENERATIVE_AI_API_KEY'] = value;
        mappedKeys['Google'] = value;
        mappedKeys['google'] = value;
      }
    });

    logger.info(`API key mapping - Original keys: ${Object.keys(apiKeys).join(', ')}`);
    logger.info(`API key mapping - Mapped keys: ${Object.keys(mappedKeys).join(', ')}`);
    
    // Debug: Log Google API key specifically
    const googleKey = mappedKeys['GOOGLE_GENERATIVE_AI_API_KEY'] || mappedKeys['Google'] || mappedKeys['google'];
    if (googleKey) {
      logger.info(`Google API key found with length: ${googleKey.length}`);
    } else {
      logger.warn(`Google API key is missing in all variations`);
      logger.warn(`Available keys: ${Object.keys(mappedKeys).join(', ')}`);
    }
    
    return mappedKeys;
  }

  private getOrCreateAgent(options: MastraServiceOptions) {
    const cacheKey = this.getCacheKey(options);
    
    if (this.agentCache.has(cacheKey)) {
      return this.agentCache.get(cacheKey);
    }

    // Validate that we have the required API key for this provider
    if (!this.hasValidApiKey(options.provider, options.apiKeys)) {
      throw new Error(`Missing or invalid API key for provider: ${options.provider}. Please add the required API key in the UI settings.`);
    }

    logger.info(`Creating new Mastra agent for ${options.provider}:${options.model}`);
    logger.info(`Available API keys: ${Object.keys(options.apiKeys).join(', ')}`);
    
    // Map UI API keys to Mastra environment variable names
    const mappedApiKeys = this.mapApiKeys(options.apiKeys);
    
    const baseUrls = this.getBaseUrls(options.providerSettings);
    const agent = createBoltAgent(options.provider, options.model, mappedApiKeys, baseUrls);
    
    // Create Mastra instance with the agent
    const mastra = createMastraInstance({ boltAgent: agent });
    
    this.agentCache.set(cacheKey, { agent, mastra });
    return { agent, mastra };
  }

  /**
   * Generate text using Mastra agent (equivalent to generateText from AI SDK)
   */
  async generateText(options: MastraServiceOptions & {
    messages: Message[];
    maxTokens?: number;
  }) {
    try {
      const { agent } = this.getOrCreateAgent(options);
      
      // Convert messages to Mastra format and include system prompt
      const messages = options.messages.map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content,
      }));

      // Add system message if provided
      if (options.system) {
        messages.unshift({
          role: 'system',
          content: options.system,
        });
      }

      logger.info(`Generating text with Mastra agent`);
      const result = await agent.generate(messages, {
        maxSteps: 5, // Allow multi-step reasoning
      });

      return {
        text: result.text,
        usage: result.usage,
        finishReason: result.finishReason,
        // Maintain compatibility with existing response format
        experimental_providerMetadata: result.experimental_providerMetadata,
      };
    } catch (error) {
      logger.error('Error generating text with Mastra:', error);
      throw error;
    }
  }

  /**
   * Stream text using Mastra agent (equivalent to streamText from AI SDK)
   */
  async streamText(options: MastraServiceOptions & {
    messages: Message[];
    maxTokens?: number;
    onFinish?: (result: any) => void;
  }) {
    try {
      const { agent } = this.getOrCreateAgent(options);
      
      // Convert messages to Mastra format
      const messages = options.messages.map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content,
      }));

      // Add system message if provided
      if (options.system) {
        messages.unshift({
          role: 'system',
          content: options.system,
        });
      }

      logger.info(`Streaming text with Mastra agent`);
      const result = await agent.stream(messages, {
        maxSteps: 5,
        onFinish: options.onFinish,
      });

      logger.info('Mastra stream result received, creating AI SDK compatible wrapper');

      // Create an AI SDK-compatible object
      // This is the key - we need to return something that looks exactly like what AI SDK's streamText returns
      const fullStreamAsync = this.createFullStreamFromTextStream(result.textStream);
      
      // Store the text content for the mergeIntoDataStream method
      let fullText = '';
      
      return {
        textStream: result.textStream,
        fullStream: fullStreamAsync,
        usage: result.usage,
        finishReason: result.finishReason || 'stop',
        
        // This is the critical method that needs to work exactly like AI SDK's version
        mergeIntoDataStream: (dataStream: any) => {
          logger.info('AI SDK compatible mergeIntoDataStream called');
          
          // The key insight: AI SDK's mergeIntoDataStream works by merging a readable stream
          // that emits text chunks in the correct format for the data stream protocol
          
          const textReadableStream = new ReadableStream({
            async start(controller) {
              try {
                for await (const chunk of result.textStream) {
                  // Emit chunks in the format expected by the dataStream protocol
                  // The chunk needs to be JSON-encoded first, then formatted as "0:jsonContent\n"
                  const jsonChunk = JSON.stringify(chunk);
                  const formattedChunk = `0:${jsonChunk}\n`;
                  controller.enqueue(formattedChunk);
                }
                controller.close();
              } catch (error) {
                logger.error('Error in AI SDK compatible stream:', error);
                controller.error(error);
              }
            }
          });

          // Use the merge method that we know exists
          if (typeof dataStream.merge === 'function') {
            logger.info('Merging text stream using dataStream.merge');
            dataStream.merge(textReadableStream);
          } else {
            logger.error('dataStream.merge method not available');
          }
        },
        
        // Make it iterable like AI SDK streams
        [Symbol.asyncIterator]: () => result.textStream[Symbol.asyncIterator](),
      };
    } catch (error) {
      logger.error('Error streaming text with Mastra:', error);
      throw error;
    }
  }

  /**
   * Create a fullStream compatible interface from textStream
   */
  private async* createFullStreamFromTextStream(textStream: AsyncIterable<string>) {
    try {
      logger.info('Starting fullStream iteration');
      for await (const chunk of textStream) {
        logger.debug(`Yielding text-delta chunk: ${chunk.substring(0, 50)}...`);
        yield {
          type: 'text-delta',
          textDelta: chunk,
        };
      }
      logger.info('Text stream completed, yielding finish');
      yield {
        type: 'finish',
        finishReason: 'stop',
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0,
        },
      };
    } catch (error) {
      logger.error('Error in fullStream iteration:', error);
      yield {
        type: 'error',
        error: error,
      };
    }
  }

  /**
   * Create a merged stream for compatibility with AI SDK's dataStream
   */
  private createMergedStream(textStream: AsyncIterable<string>, dataStream: any) {
    logger.info('Creating merged stream for dataStream compatibility');
    
    // Create a readable stream that merges the text stream
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of textStream) {
            // Format the chunk for the dataStream protocol
            const formattedChunk = `0:"${chunk.replace(/"/g, '\\"')}"\n`;
            controller.enqueue(new TextEncoder().encode(formattedChunk));
          }
          controller.close();
        } catch (error) {
          logger.error('Error in merged stream:', error);
          controller.error(error);
        }
      }
    });

    // The dataStream should merge this readable stream
    if (typeof dataStream.merge === 'function') {
      return dataStream.merge(readable);
    } else if (typeof dataStream.pipeThrough === 'function') {
      return dataStream.pipeThrough(readable);
    } else {
      logger.warn('DataStream does not have merge or pipeThrough method');
      return readable;
    }
  }

  /**
   * Merge textStream into a data stream for compatibility
   */
  private async mergeTextStreamIntoDataStream(textStream: AsyncIterable<string>, dataStream: any) {
    try {
      logger.info('Starting mergeTextStreamIntoDataStream');
      
      // Check if we can merge a readable stream
      if (typeof dataStream.merge === 'function') {
        logger.info('Using dataStream.merge() to merge text stream');
        
        // Create a readable stream that formats the text properly for the protocol
        const formattedStream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of textStream) {
                // Format the chunk for the streaming protocol
                // Based on the transform stream in the chat route, text content should be formatted as `0:content\n`
                const formattedChunk = `0:${chunk}\n`;
                controller.enqueue(new TextEncoder().encode(formattedChunk));
              }
              controller.close();
            } catch (error) {
              logger.error('Error in formatted stream:', error);
              controller.error(error);
            }
          }
        });

        // Merge the formatted stream
        dataStream.merge(formattedStream);
      } else {
        logger.warn('dataStream.merge method not available, trying alternative approach');
        
        // Alternative: try to stream content directly using writeData
        (async () => {
          try {
            for await (const chunk of textStream) {
              // Try writing directly to the dataStream
              const formattedChunk = `0:${chunk}\n`;
              if (typeof dataStream.writeData === 'function') {
                dataStream.writeData(formattedChunk);
              }
            }
          } catch (error) {
            logger.error('Error in alternative streaming:', error);
          }
        })();
      }
      
    } catch (error) {
      logger.error('Error merging text stream into data stream:', error);
      throw error;
    }
  }

  /**
   * Clear the agent cache (useful for refreshing with new settings)
   */
  clearCache() {
    this.agentCache.clear();
    logger.info('Mastra agent cache cleared');
  }
}

export const mastraService = MastraService.getInstance();
