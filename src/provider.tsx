import {type ReactNode} from "react";
import {
    // AuthProvider,
    OpenfortProvider,
    getDefaultConfig,
    // RecoveryMethod,
} from "@openfort/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig } from "wagmi";
import { polygonAmoy } from "viem/chains";

const config = createConfig(
    getDefaultConfig({
        appName: "NairaPay",
        walletConnectProjectId: "YOUR_WALLET_CONNECT_PROJECT_ID",
        chains: [polygonAmoy],
        ssr: true,
    })
);

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <OpenfortProvider
                    // Set the publishable key of your Openfort account. This field is required.
                    publishableKey={"YOUR_PUBLISHABLE_KEY"}

                    // Set the wallet configuration.
                    walletConfig={{
                        shieldPublishableKey: "YOUR_SHIELD_PUBLISHABLE_KEY",
                        // If you want to use AUTOMATIC embedded wallet recovery, an encryption session is required.
                        // http://localhost:5173/docs/products/embedded-wallet/react/wallet/create#automatic-recovery.
                        createEncryptedSessionEndpoint: "YOUR_BACKEND_ENDPOINT",
                    }}
                >
                    {children}
                </OpenfortProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}