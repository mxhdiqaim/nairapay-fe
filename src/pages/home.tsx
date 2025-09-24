import { useStatus, useOAuth, useSignOut, useWallets, useUser, OpenfortButton } from "@openfort/react";
import { useReadContract } from "wagmi";
import { formatUnits } from "viem";

// ABI for a standard ERC-20 token (only the necessary functions)
const erc20Abi = [
    {
        name: "balanceOf",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "account", type: "address" }],
        outputs: [{ type: "uint256" }],
    },
    {
        name: "decimals",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "uint8" }],
    },
] as const;

// USDC testnet token address on Polygon Amoy
const stablecoinAddress = "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582";

const HomeScreen = () => {
    const { isAuthenticated, isLoading: isAuthLoading } = useStatus();
    const { user } = useUser();
    const { isLoading: isOAuthLoading } = useOAuth();
    const { isLoading: isSignOutLoading } = useSignOut();
    const { activeWallet, wallets, isLoadingWallets } = useWallets();

    // Use wagmi's useReadContract to fetch the stablecoin balance
    const {
        data: balance,
        isLoading: isBalanceLoading,
        error: balanceError,
    } = useReadContract({
        address: stablecoinAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [activeWallet?.address as `0x${string}`],
        query: {
            // This ensures the query only runs when a wallet address is available
            enabled: !!activeWallet?.address,
        },
    });

    const isLoading = isAuthLoading || isOAuthLoading || isSignOutLoading || isLoadingWallets || isBalanceLoading;

    const formattedBalance = balance ? formatUnits(balance, 6) : "0.00";

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>NairaPay dApp</h1>

            {isLoading ? (
                <p>Loading...</p>
            ) : isAuthenticated ? (
                <div>
                    <h2>Welcome, {user?.player?.name || "User"}!</h2>
                    <p>You are authenticated. You can now interact with the blockchain.</p>

                    {isLoadingWallets ? (
                        <p>Fetching wallets...</p>
                    ) : activeWallet ? (
                        <div>
                            <h3>Your Active Wallet:</h3>
                            <p>
                                Address: <code>{activeWallet.address}</code>
                            </p>
                            <p>
                                Account ID: <code>{activeWallet.accountId}</code>
                            </p>
                            <p>Type: {activeWallet.accountType}</p>
                            <p>Recovery Method: {activeWallet.recoveryMethod}</p>

                            <h4 style={{ marginTop: "20px" }}>Your Stablecoin Balance:</h4>
                            {isBalanceLoading ? (
                                <p>Loading balance...</p>
                            ) : balanceError ? (
                                <p>Error loading balance. Make sure your network is set to Polygon Amoy.</p>
                            ) : (
                                <p>**{formattedBalance} USDC**</p>
                            )}

                            {wallets.length > 1 && (
                                <div>
                                    <h4>Other Wallets:</h4>
                                    <ul>
                                        {wallets.map((w) => (
                                            <li key={w.address}>{w.address}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>No active wallet found. A wallet should be created automatically.</p>
                    )}
                </div>
            ) : (
                <div>
                    <h2>Sign In to NairaPay</h2>
                    <p>Please sign in with your social account to get started.</p>
                    <OpenfortButton showAvatar={true} showBalance={true} label={"Login"} />
                </div>
            )}
        </div>
    );
};

export default HomeScreen;
