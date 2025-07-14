import { atom } from 'nanostores';
import type { NosanaConnection, NosanaWallet, NosanaJob } from '~/types/nosana';
import { logStore } from './logs';
import { toast } from 'react-toastify';

// Initialize with stored connection or environment variable
const storedConnection = typeof window !== 'undefined' ? localStorage.getItem('nosana_connection') : null;
const envPrivateKey = import.meta.env.VITE_NOSANA_PRIVATE_KEY;

const initialConnection: NosanaConnection = storedConnection
  ? JSON.parse(storedConnection)
  : {
      wallet: null,
      privateKey: envPrivateKey || '',
      network: 'mainnet',
      isConnected: false,
    };

export const nosanaConnection = atom<NosanaConnection>(initialConnection);
export const isConnecting = atom<boolean>(false);
export const isFetchingJobs = atom<boolean>(false);

// Function to initialize Nosana connection with private key
export async function initializeNosanaConnection(privateKey: string) {
  try {
    isConnecting.set(true);

    // Import Nosana SDK dynamically (since it's a Node.js module)
    const { Client } = await import('@nosana/sdk');
    
    const nosana = new Client('mainnet', privateKey);
    
    // Get wallet info
    const publicKey = nosana.solana.wallet.publicKey.toString();
    const solBalance = await nosana.solana.getSolBalance();
    const nosBalanceData = await nosana.solana.getNosBalance();
    const nosBalance = nosBalanceData?.amount ? parseFloat(nosBalanceData.amount.toString()) : 0;

    const walletInfo: NosanaWallet = {
      publicKey,
      solBalance,
      nosBalance,
    };

    const connectionData: NosanaConnection = {
      wallet: walletInfo,
      privateKey,
      network: 'mainnet',
      isConnected: true,
    };

    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('nosana_connection', JSON.stringify(connectionData));
    }

    // Update the store
    nosanaConnection.set(connectionData);

    logStore.logSystem('Nosana connection established', { 
      publicKey,
      solBalance,
      nosBalance 
    });

    return true;
  } catch (error) {
    console.error('Error initializing Nosana connection:', error);
    logStore.logError('Failed to initialize Nosana connection', { error });
    toast.error('Failed to connect to Nosana. Please check your private key.');
    return false;
  } finally {
    isConnecting.set(false);
  }
}

export const updateNosanaConnection = (updates: Partial<NosanaConnection>) => {
  const currentState = nosanaConnection.get();
  const newState = { ...currentState, ...updates };
  nosanaConnection.set(newState);

  // Persist to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('nosana_connection', JSON.stringify(newState));
  }
};

export async function fetchNosanaJobs(privateKey: string) {
  try {
    isFetchingJobs.set(true);

    // Here you would typically fetch jobs from Nosana
    // For now, we'll just return empty array since Nosana doesn't have a direct API for listing user jobs
    const jobs: NosanaJob[] = [];

    const currentState = nosanaConnection.get();
    updateNosanaConnection({
      ...currentState,
      jobs,
    });
  } catch (error) {
    console.error('Nosana API Error:', error);
    logStore.logError('Failed to fetch Nosana jobs', { error });
    toast.error('Failed to fetch Nosana jobs');
  } finally {
    isFetchingJobs.set(false);
  }
}

export function disconnectNosana() {
  const emptyConnection: NosanaConnection = {
    wallet: null,
    privateKey: '',
    network: 'mainnet',
    isConnected: false,
  };

  nosanaConnection.set(emptyConnection);
  
  if (typeof window !== 'undefined') {
    localStorage.removeItem('nosana_connection');
  }

  toast.success('Disconnected from Nosana');
}
