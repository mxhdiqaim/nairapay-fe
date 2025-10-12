import { type ReactNode } from "react";
import { OpenfortProvider, getDefaultConfig, AuthProvider, RecoveryMethod } from "@openfort/react";
import { AccountTypeEnum } from "@openfort/openfort-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig } from "wagmi";
import { polygonAmoy } from "viem/chains";
import { getEnvVariable } from "@/utils";

const publishableKey = getEnvVariable("VITE_OPENFORT_PUBLISHABLE_KEY");
const walletConnectProjectId = getEnvVariable("VITE_WALLET_CONNECT_PROJECT_ID");
const shieldPublishableKey = getEnvVariable("VITE_OPENFORT_SHIELD_PUBLISHABLE_KEY");
const openfortPolicyId = getEnvVariable("VITE_OPENFORT_POLICY_ID");

const config = createConfig(
    getDefaultConfig({
        appName: "NairaPay",
        walletConnectProjectId,
        chains: [polygonAmoy],
        ssr: true,
    }),
);

const queryClient = new QueryClient();

const authProviders: AuthProvider[] = [AuthProvider.GUEST, AuthProvider.EMAIL];

const allowedMethods = [RecoveryMethod.PASSWORD, RecoveryMethod.AUTOMATIC, RecoveryMethod.PASSKEY];

export const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <OpenfortProvider
                    publishableKey={publishableKey}
                    walletConfig={{
                        shieldPublishableKey,
                        accountType: AccountTypeEnum.SMART_ACCOUNT,
                        ethereumProviderPolicyId: {
                            [polygonAmoy.id]: openfortPolicyId,
                        },
                    }}
                    uiConfig={{
                        authProviders,
                        theme: "auto",
                        walletRecovery: {
                            allowedMethods,
                            defaultMethod: RecoveryMethod.PASSWORD,
                        },
                    }}
                >
                    {children}
                </OpenfortProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};
