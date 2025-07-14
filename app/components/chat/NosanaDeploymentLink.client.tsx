import { useStore } from '@nanostores/react';
import { nosanaConnection } from '~/lib/stores/nosana';
import { chatId } from '~/lib/persistence/useChatHistory';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useEffect, useState } from 'react';
import type { NosanaDeploymentInfo } from '~/types/nosana';

export function NosanaDeploymentLink() {
  const connection = useStore(nosanaConnection);
  const currentChatId = useStore(chatId);
  const [deployment, setDeployment] = useState<NosanaDeploymentInfo | null>(null);

  useEffect(() => {
    if (connection.isConnected && currentChatId) {
      // Check for stored deployment info for this chat
      const storedDeployment = localStorage.getItem(`nosana-deployment-${currentChatId}`);
      if (storedDeployment) {
        try {
          const deploymentInfo = JSON.parse(storedDeployment);
          setDeployment(deploymentInfo);
        } catch (error) {
          console.error('Error parsing stored Nosana deployment:', error);
        }
      }
    }
  }, [connection.isConnected, currentChatId]);

  if (!deployment) {
    return null;
  }

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <a
            href={deployment.serviceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-bolt-elements-item-backgroundActive text-bolt-elements-textSecondary hover:text-[#ff6b35] z-50"
            onClick={(e) => {
              e.stopPropagation(); // This is to prevent click from bubbling up
            }}
          >
            <div className="i-ph:link w-4 h-4 hover:text-[#ff6b35]" />
          </a>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="px-3 py-2 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textPrimary text-xs z-50"
            sideOffset={5}
          >
            <div className="flex flex-col gap-1">
              <div>Service: {deployment.serviceUrl}</div>
              <div>Job ID: {deployment.jobId}</div>
              <div className="text-xs text-bolt-elements-textSecondary">
                View on{' '}
                <a 
                  href={deployment.explorerUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#ff6b35] hover:underline"
                >
                  Nosana Explorer
                </a>
              </div>
            </div>
            <Tooltip.Arrow className="fill-bolt-elements-background-depth-3" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
