import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare';

// Helper function to safely get uptime
const getUptime = (): number => {
  try {
    // Check if we're in Node.js environment
    if (typeof process !== 'undefined' && process.uptime && typeof process.uptime === 'function') {
      return process.uptime();
    }
    // Fallback for Workers environment - use a simple timestamp
    return Math.floor(Date.now() / 1000);
  } catch {
    return 0;
  }
};

// Helper function to safely get memory usage
const getMemoryUsage = () => {
  try {
    // Check if we're in Node.js environment
    if (typeof process !== 'undefined' && process.memoryUsage && typeof process.memoryUsage === 'function') {
      const mem = process.memoryUsage();
      return {
        used: Math.round(mem.heapUsed / 1024 / 1024),
        total: Math.round(mem.heapTotal / 1024 / 1024),
      };
    }
    // Fallback for Workers environment
    return {
      used: 0,
      total: 0,
    };
  } catch {
    return {
      used: 0,
      total: 0,
    };
  }
};

// Cache the health response to reduce memory allocation
const healthResponse = {
  status: 'healthy',
  uptime: getUptime(),
  memory: getMemoryUsage(),
};

export const loader = async ({ request: _request }: LoaderFunctionArgs) => {
  // Only update timestamp and memory info
  healthResponse.uptime = getUptime();
  healthResponse.memory = getMemoryUsage();

  return json(healthResponse, {
    headers: {
      'Cache-Control': 'max-age=30', // Cache for 30 seconds
    },
  });
};
