import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare';

// Cache the health response to reduce memory allocation
const healthResponse = {
  status: 'healthy',
  uptime: process.uptime(),
  memory: {
    used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
  },
};

export const loader = async ({ request: _request }: LoaderFunctionArgs) => {
  // Only update timestamp and memory info
  healthResponse.uptime = process.uptime();
  healthResponse.memory = {
    used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
  };

  return json(healthResponse, {
    headers: {
      'Cache-Control': 'max-age=30', // Cache for 30 seconds
    },
  });
};
