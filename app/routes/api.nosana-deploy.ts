import { type ActionFunctionArgs, json } from '@remix-run/cloudflare';
import type { NosanaDeploymentInfo } from '~/types/nosana';

interface DeployRequestBody {
  files: Record<string, string>;
  privateKey: string;
  chatId: string;
  projectName?: string;
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const { files, privateKey, chatId, projectName } = (await request.json()) as DeployRequestBody;

    if (!privateKey) {
      return json({ error: 'Nosana private key is required' }, { status: 401 });
    }

    if (!files || Object.keys(files).length === 0) {
      return json({ error: 'No files provided for deployment' }, { status: 400 });
    }

    // Import Nosana SDK
    const { Client, PublicKey } = await import('@nosana/sdk');
    const nosana = new Client('mainnet', privateKey);

    // Check wallet balance
    const solBalance = await nosana.solana.getSolBalance();
    const nosBalanceData = await nosana.solana.getNosBalance();
    
    if (solBalance < 0.01) {
      return json({ error: 'Insufficient SOL balance. You need at least 0.01 SOL for deployment.' }, { status: 400 });
    }

    if (!nosBalanceData?.amount || parseFloat(nosBalanceData.amount.toString()) < 1) {
      return json({ error: 'Insufficient NOS balance. You need at least 1 NOS for deployment.' }, { status: 400 });
    }

    // Detect if this is a web application and determine the appropriate container setup
    const hasIndexHtml = files['index.html'] || files['/index.html'];
    const hasPackageJson = files['package.json'] || files['/package.json'];
    const isNextApp = hasPackageJson && (files['package.json']?.includes('next') || files['/package.json']?.includes('next'));
    const isReactApp = hasPackageJson && (files['package.json']?.includes('react') || files['/package.json']?.includes('react'));

    let jobDefinition;

    if (hasIndexHtml) {
      // Static site deployment using nginx
      const fileContents = Object.entries(files)
        .map(([path, content]) => {
          const cleanPath = path.startsWith('/') ? path.substring(1) : path;
          // Escape content for dockerfile
          const escapedContent = content.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
          return `echo "${escapedContent}" > /usr/share/nginx/html/${cleanPath}`;
        })
        .join(' && ');

      jobDefinition = {
        version: "0.1",
        type: "container",
        meta: {
          trigger: "mastrabolt-deploy"
        },
        ops: [
          {
            type: "container/run",
            id: "web-app",
            args: {
              image: "nginx:alpine",
              expose: 80,
              cmd: [
                "/bin/sh",
                "-c",
                `mkdir -p /usr/share/nginx/html && ${fileContents} && nginx -g 'daemon off;'`
              ]
            }
          }
        ]
      };
    } else if (isNextApp || isReactApp) {
      // Node.js application deployment
      const packageJsonContent = files['package.json'] || files['/package.json'] || '{}';
      const hasYarnLock = files['yarn.lock'] || files['/yarn.lock'];
      const packageManager = hasYarnLock ? 'yarn' : 'npm';
      
      const setupCommands = Object.entries(files)
        .map(([path, content]) => {
          const cleanPath = path.startsWith('/') ? path.substring(1) : path;
          const escapedContent = content.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
          return `echo "${escapedContent}" > /app/${cleanPath}`;
        })
        .join(' && ');

      jobDefinition = {
        version: "0.1",
        type: "container",
        meta: {
          trigger: "mastrabolt-deploy"
        },
        ops: [
          {
            type: "container/run",
            id: "node-app",
            args: {
              image: "node:18-alpine",
              expose: 3000,
              cmd: [
                "/bin/sh",
                "-c",
                `mkdir -p /app && cd /app && ${setupCommands} && ${packageManager} install && ${packageManager} run build && ${packageManager} start`
              ],
              env: {
                NODE_ENV: "production",
                PORT: "3000"
              }
            }
          }
        ]
      };
    } else {
      // Generic static file server
      const fileContents = Object.entries(files)
        .map(([path, content]) => {
          const cleanPath = path.startsWith('/') ? path.substring(1) : path;
          const escapedContent = content.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
          return `echo "${escapedContent}" > /usr/share/nginx/html/${cleanPath}`;
        })
        .join(' && ');

      jobDefinition = {
        version: "0.1",
        type: "container",
        meta: {
          trigger: "mastrabolt-deploy"
        },
        ops: [
          {
            type: "container/run",
            id: "static-site",
            args: {
              image: "nginx:alpine",
              expose: 80,
              cmd: [
                "/bin/sh",
                "-c",
                `mkdir -p /usr/share/nginx/html && ${fileContents} && nginx -g 'daemon off;'`
              ]
            }
          }
        ]
      };
    }

    // Upload job definition to IPFS
    const ipfsHash = await nosana.ipfs.pin(jobDefinition);

    // Use the main GPU market (you can customize this based on requirements)
    const market = new PublicKey('97G9NnvBDQ2WpKu6fasoMsAKmfj63C9rhysJnkeWodAf');

    // Post job to Nosana network
    const response = await nosana.jobs.list(ipfsHash, market);

    const deploymentInfo: NosanaDeploymentInfo = {
      jobId: response.job,
      serviceUrl: `https://${response.job}.node.k8s.prd.nos.ci`,
      explorerUrl: `https://dashboard.nosana.com/jobs/${response.job}`,
      ipfsHash,
      marketAddress: market.toBase58(),
      chatId,
    };

    // Store deployment info for this chat
    // You might want to store this in a database in a real application

    return json({
      success: true,
      deployment: deploymentInfo,
      message: 'Application deployed successfully to Nosana network!'
    });

  } catch (error) {
    console.error('Nosana deployment error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('balance')) {
        return json({ error: 'Insufficient balance. Please ensure you have enough SOL and NOS tokens.' }, { status: 400 });
      }
      if (error.message.includes('network')) {
        return json({ error: 'Network error. Please check your connection and try again.' }, { status: 500 });
      }
    }

    return json({ error: 'Deployment failed. Please try again.' }, { status: 500 });
  }
}
