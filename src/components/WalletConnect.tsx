import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Check } from "lucide-react";

const WalletConnect = () => {
  const { isConnected, address } = useAccount();

  return (
    <div className="flex items-center gap-2">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="bg-gradient-card border border-primary/20 hover:bg-gradient-earth hover:text-primary-foreground transition-all duration-300 shadow-eco px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
                    >
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-card border border-primary/20 rounded-lg shadow-eco">
                      <div className="w-2 h-2 bg-emerald rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-foreground">
                        {account.displayName}
                      </span>
                      <Check className="w-4 h-4 text-emerald" />
                    </div>
                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Account
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default WalletConnect;