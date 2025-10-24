import { Mastra } from '@mastra/core';
import { solpilotAgent } from './agents/solpilot';
import { soniaAgent } from './agents/sonia';
import { zerionAgent } from './agents/zerion';

// Initialize Mastra with all agents
export const mastra = new Mastra({
  agents: {
    solpilot: solpilotAgent,
    sonia: soniaAgent,
    zerion: zerionAgent,
  },
});

// Export individual agents for direct access
export { solpilotAgent, soniaAgent, zerionAgent };
