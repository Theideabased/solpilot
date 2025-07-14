import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { nosanaConnection, isConnecting, initializeNosanaConnection, disconnectNosana } from '~/lib/stores/nosana';
import { toast } from 'react-toastify';

export default function NosanaConnection() {
  const connection = useStore(nosanaConnection);
  const connecting = useStore(isConnecting);
  const [privateKey, setPrivateKey] = useState(connection.privateKey || '');
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const handleConnect = async () => {
    if (!privateKey.trim()) {
      toast.error('Please enter your Solana private key');
      return;
    }

    const success = await initializeNosanaConnection(privateKey.trim());
    if (success) {
      toast.success('Successfully connected to Nosana!');
    }
  };

  const handleDisconnect = () => {
    disconnectNosana();
    setPrivateKey('');
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-bolt-elements-textPrimary">Nosana Connection</h3>
        {connection.isConnected && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-bolt-elements-textSecondary">Connected</span>
          </div>
        )}
      </div>

      {!connection.isConnected ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-bolt-elements-textPrimary mb-2">
              Solana Private Key
            </label>
            <div className="relative">
              <input
                type={showPrivateKey ? 'text' : 'password'}
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Enter your Solana private key..."
                className="w-full px-3 py-2 border border-bolt-elements-borderColor rounded-md bg-bolt-elements-background-depth-1 text-bolt-elements-textPrimary focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
              <button
                type="button"
                onClick={() => setShowPrivateKey(!showPrivateKey)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"
              >
                {showPrivateKey ? '🙈' : '👁️'}
              </button>
            </div>
            <p className="mt-1 text-xs text-bolt-elements-textSecondary">
              Your private key is stored locally and never sent to our servers. Make sure you have SOL and NOS tokens for deployments.
            </p>
          </div>

          <button
            onClick={handleConnect}
            disabled={connecting || !privateKey.trim()}
            className="w-full px-4 py-2 bg-accent-500 text-white rounded-md hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {connecting ? 'Connecting...' : 'Connect to Nosana'}
          </button>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
            <p className="text-sm text-bolt-elements-textPrimary">
              <strong>How to get started:</strong>
            </p>
            <ol className="text-xs text-bolt-elements-textSecondary mt-2 space-y-1">
              <li>1. Install the Nosana CLI: <code className="bg-bolt-elements-background-depth-2 px-1 rounded">npm install -g @nosana/cli</code></li>
              <li>2. Generate a keypair: <code className="bg-bolt-elements-background-depth-2 px-1 rounded">nosana address</code></li>
              <li>3. Fund your wallet with SOL and NOS tokens</li>
              <li>4. Use your private key from <code className="bg-bolt-elements-background-depth-2 px-1 rounded">~/.nosana/nosana_key.json</code></li>
            </ol>
            <p className="text-xs text-bolt-elements-textSecondary mt-2">
              Learn more: <a href="https://docs.nosana.io/sdk/sdk_start.html" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:underline">Nosana Documentation</a>
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-bolt-elements-textPrimary">Wallet Connected</h4>
                <p className="text-xs text-bolt-elements-textSecondary mt-1">
                  {connection.wallet?.publicKey}
                </p>
              </div>
            </div>
            
            {connection.wallet && (
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-bolt-elements-textSecondary">SOL Balance</p>
                  <p className="text-sm font-medium text-bolt-elements-textPrimary">
                    {connection.wallet.solBalance.toFixed(6)} SOL
                  </p>
                </div>
                <div>
                  <p className="text-xs text-bolt-elements-textSecondary">NOS Balance</p>
                  <p className="text-sm font-medium text-bolt-elements-textPrimary">
                    {connection.wallet.nosBalance.toFixed(2)} NOS
                  </p>
                </div>
              </div>
            )}

            {connection.wallet && (connection.wallet.solBalance < 0.01 || connection.wallet.nosBalance < 1) && (
              <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  ⚠️ Low balance detected. You need at least 0.01 SOL and 1 NOS for deployments.
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleDisconnect}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
