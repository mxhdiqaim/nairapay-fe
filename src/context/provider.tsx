import { type ReactNode } from "react";
import {
    // AuthProvider,
    OpenfortProvider,
    getDefaultConfig,
    AuthProvider,
    RecoveryMethod,
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
    }),
);

const authProviders = [AuthProvider.GUEST, AuthProvider.EMAIL, AuthProvider.GOOGLE, AuthProvider.WALLET];

const publishableKey = import.meta.env.VITE_OPENFORT_PUBLISHABLE_KEY;
const shieldPublishableKey = import.meta.env.VITE_OPENFORT_SHIELD_PUBLISHABLE_KEY;
// const backendUrl = import.meta.env.VITE_OPENFORT_BACKEND_ENDPOINT;

const queryClient = new QueryClient();

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <OpenfortProvider
                    publishableKey={publishableKey}
                    walletConfig={{
                        shieldPublishableKey,
                        // If you want to use AUTOMATIC embedded wallet recovery, an encryption session is required.
                        // http://localhost:5173/docs/products/embedded-wallet/react/wallet/create#automatic-recovery.
                        // createEncryptedSessionEndpoint: backendUrl,
                    }}
                    uiConfig={{
                        authProviders,
                        theme: "midnight",
                        walletRecovery: {
                            defaultMethod: RecoveryMethod.PASSKEY,
                            allowedMethods: [RecoveryMethod.PASSWORD, RecoveryMethod.AUTOMATIC, RecoveryMethod.PASSKEY],
                        },
                    }}
                >
                    {children}
                </OpenfortProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default Provider;
