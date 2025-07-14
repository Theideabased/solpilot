export interface NosanaJob {
  id: string;
  state: 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  ipfsHash: string;
  ipfsResult?: string;
  marketAddress: string;
  serviceUrl?: string;
  explorerUrl: string;
  price: string;
  duration?: number;
  createdAt: string;
  completedAt?: string;
  logs?: string[];
}

export interface NosanaMarket {
  id: string;
  address: string;
  name: string;
  pricePerSecond: number;
  gpuType: string;
  totalNodes: number;
  availableNodes: number;
}

export interface NosanaWallet {
  publicKey: string;
  solBalance: number;
  nosBalance: number;
}

export interface NosanaConnection {
  wallet: NosanaWallet | null;
  privateKey: string;
  network: 'mainnet' | 'devnet';
  isConnected: boolean;
  jobs?: NosanaJob[];
}

export interface NosanaJobDefinition {
  version: string;
  type: 'container';
  meta?: {
    trigger: string;
  };
  ops: Array<{
    type: 'container/run';
    id: string;
    args: {
      cmd?: string | string[];
      image: string;
      expose?: number;
      env?: Record<string, string>;
      gpu?: boolean;
      entrypoint?: string[];
    };
  }>;
}

export interface NosanaDeploymentInfo {
  jobId: string;
  serviceUrl: string;
  explorerUrl: string;
  ipfsHash: string;
  marketAddress: string;
  chatId: string;
}
