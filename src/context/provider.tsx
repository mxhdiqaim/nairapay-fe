import {type ReactNode} from "react";
import {
    // AuthProvider,
    OpenfortProvider,
    getDefaultConfig, AuthProvider,
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

const authProviders = [
    AuthProvider.GUEST,
    AuthProvider.EMAIL,
    AuthProvider.GOOGLE,
    AuthProvider.WALLET,
]

const queryClient = new QueryClient();

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <OpenfortProvider
                    publishableKey={"YOUR_PUBLISHABLE_KEY"}
                    walletConfig={{
                        shieldPublishableKey: "YOUR_SHIELD_PUBLISHABLE_KEY",
                        // If you want to use AUTOMATIC embedded wallet recovery, an encryption session is required.
                        // http://localhost:5173/docs/products/embedded-wallet/react/wallet/create#automatic-recovery.
                        createEncryptedSessionEndpoint: "YOUR_BACKEND_ENDPOINT",
                    }}
                    uiConfig={{ authProviders }}
                >
                    {children}
                </OpenfortProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default Provider;