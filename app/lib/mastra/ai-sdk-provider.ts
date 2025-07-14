import type { LanguageModelV1, LanguageModelV1CallOptions, LanguageModelV1StreamPart, LanguageModelV1FinishReason, LanguageModelV1FunctionToolCall, LanguageModelV1LogProbs, LanguageModelV1CallWarning } from 'ai';
import { mastraService } from './service';
import { createScopedLogger } from '~/utils/logger';
import type { IProviderSetting } from '~/types/model';

const logger = createScopedLogger('mastra-ai-sdk-provider');

/**
 * Custom AI SDK Language Model that uses Mastra agents under the hood
 * This provides 100% AI SDK compatibility while using Mastra for the actual LLM calls
 */
export class MastraLanguageModel implements LanguageModelV1 {
  readonly specificationVersion = 'v1';
  readonly provider: string;
  readonly modelId: string;
  readonly maxTokens?: number;
  readonly defaultObjectGenerationMode = undefined;
  
  private apiKeys: Record<string, string>;
  private providerSettings?: Record<string, IProviderSetting>;

  constructor(
    provider: string,
    modelId: string,
    apiKeys: Record<string, string>,
    providerSettings?: Record<string, IProviderSetting>,
    maxTokens?: number
  ) {
    this.provider = provider;
    this.modelId = modelId;
    this.apiKeys = apiKeys;
    this.providerSettings = providerSettings;
    this.maxTokens = maxTokens;
  }

  async doGenerate(options: LanguageModelV1CallOptions) {
    logger.info(`MastraLanguageModel.doGenerate called for ${this.provider}:${this.modelId}`);
    
    try {
      // Defensive check for prompt
      if (!options.prompt || !Array.isArray(options.prompt)) {
        logger.error('Options.prompt is undefined or not an array:', options.prompt);
        throw new Error('Prompt is required for text generation');
      }

      // Convert AI SDK format to Mastra format
      const messages = options.prompt.map((msg: any) => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.role === 'user' 
          ? Array.isArray(msg.content) 
            ? msg.content.map((part: any) => part.type === 'text' ? part.text : '').join('')
            : msg.content
          : msg.role === 'assistant'
            ? Array.isArray(msg.content)
              ? msg.content.map((part: any) => part.type === 'text' ? part.text : '').join('')
              : msg.content
            : msg.content, // system message content is already a string
      }));

      // Use Mastra service to generate text
      const result = await mastraService.generateText({
        provider: this.provider,
        model: this.modelId,
        apiKeys: this.apiKeys,
        providerSettings: this.providerSettings,
        system: options.prompt.find((m: any) => m.role === 'system')?.content as string,
        messages: messages.filter((m: any) => m.role !== 'system'),
        maxTokens: options.maxTokens || this.maxTokens,
      });

      // Convert Mastra result back to AI SDK format
      return {
        text: result.text,
        usage: {
          promptTokens: result.usage?.promptTokens || 0,
          completionTokens: result.usage?.completionTokens || 0,
        },
        finishReason: (result.finishReason as LanguageModelV1FinishReason) || 'stop',
        rawCall: {
          rawPrompt: options.prompt,
          rawSettings: {},
        },
        response: {
          headers: {},
          id: 'mastra-' + Date.now(),
          timestamp: new Date(),
          modelId: this.modelId,
        },
      };
    } catch (error) {
      logger.error('Error in MastraLanguageModel.doGenerate:', error);
      throw error;
    }
  }

  async doStream(options: LanguageModelV1CallOptions) {
    logger.info(`MastraLanguageModel.doStream called for ${this.provider}:${this.modelId}`);
    logger.info('Options received in doStream:', JSON.stringify(options, null, 2));
    
    try {
      // Defensive check for prompt
      if (!options.prompt || !Array.isArray(options.prompt)) {
        logger.error('Options.prompt is undefined or not an array:', options.prompt);
        logger.error('Full options object:', options);
        throw new Error('Prompt is required for text streaming');
      }

      // Convert AI SDK format to Mastra format
      const messages = options.prompt.map((msg: any) => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.role === 'user' 
          ? Array.isArray(msg.content) 
            ? msg.content.map((part: any) => part.type === 'text' ? part.text : '').join('')
            : msg.content
          : msg.role === 'assistant'
            ? Array.isArray(msg.content)
              ? msg.content.map((part: any) => part.type === 'text' ? part.text : '').join('')
              : msg.content
            : msg.content, // system message content is already a string
      }));

      // Use Mastra service to stream text
      const result = await mastraService.streamText({
        provider: this.provider,
        model: this.modelId,
        apiKeys: this.apiKeys,
        providerSettings: this.providerSettings,
        system: options.prompt.find((m: any) => m.role === 'system')?.content as string,
        messages: messages.filter((m: any) => m.role !== 'system'),
        maxTokens: options.maxTokens || this.maxTokens,
      });

      logger.info('Mastra streaming result received, converting to AI SDK stream format');

      // Convert async generator to ReadableStream
      const stream = new ReadableStream({
        async start(controller) {
          try {
            logger.info('Starting stream conversion from Mastra to AI SDK format');
            
            for await (const chunk of result.textStream) {
              logger.debug('Streaming chunk:', chunk);
              controller.enqueue({
                type: 'text-delta',
                textDelta: chunk,
              } as LanguageModelV1StreamPart);
            }

            // Yield finish event
            const finishEvent = {
              type: 'finish',
              finishReason: (result.finishReason as LanguageModelV1FinishReason) || 'stop',
              usage: {
                promptTokens: result.usage?.promptTokens || 0,
                completionTokens: result.usage?.completionTokens || 0,
                totalTokens: (result.usage?.promptTokens || 0) + (result.usage?.completionTokens || 0),
              },
            } as LanguageModelV1StreamPart;
            
            logger.info('Sending finish event:', finishEvent);
            controller.enqueue(finishEvent);

            controller.close();
            logger.info('Stream conversion completed successfully');
          } catch (error) {
            logger.error('Error in Mastra stream conversion:', error);
            controller.error(error);
          }
        }
      });

      return {
        stream,
        rawCall: {
          rawPrompt: options.prompt,
          rawSettings: {},
        },
        rawResponse: {
          headers: {},
        },
      };

    } catch (error) {
      logger.error('Error in MastraLanguageModel.doStream:', error);
      throw error;
    }
  }
}

/**
 * Creates a Mastra-powered language model that's compatible with AI SDK
 */
export function createMastraAISDKModel(
  provider: string,
  modelId: string,
  apiKeys: Record<string, string>,
  providerSettings?: Record<string, IProviderSetting>,
  maxTokens?: number
): LanguageModelV1 {
  return new MastraLanguageModel(provider, modelId, apiKeys, providerSettings, maxTokens);
}
