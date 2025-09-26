import { type ReactNode } from "react";
import { OpenfortProvider, getDefaultConfig, AuthProvider, RecoveryMethod } from "@openfort/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig } from "wagmi";
import { polygonAmoy } from "viem/chains";
import { getEnvVariable } from "@/utils";

const publishableKey = getEnvVariable("VITE_OPENFORT_PUBLISHABLE_KEY");
const shieldPublishableKey = getEnvVariable("VITE_OPENFORT_SHIELD_PUBLISHABLE_KEY");
const walletConnectProjectId = getEnvVariable("VITE_WALLET_CONNECT_PROJECT_ID");

const config = createConfig(
    getDefaultConfig({
        appName: "NairaPay",
        walletConnectProjectId,
        chains: [polygonAmoy],
        ssr: true,
    }),
);

const authProviders = [AuthProvider.GUEST, AuthProvider.EMAIL, AuthProvider.GOOGLE, AuthProvider.WALLET];

const queryClient = new QueryClient();

export const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <OpenfortProvider
                    publishableKey={publishableKey}
                    walletConfig={{ shieldPublishableKey }}
                    uiConfig={{
                        authProviders,
                        theme: "midnight",
                        walletRecovery: {
                            defaultMethod: RecoveryMethod.PASSWORD,
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
