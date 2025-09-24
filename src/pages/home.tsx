import { useStatus, useOAuth, useSignOut, useWallets, useUser, OpenfortButton } from "@openfort/react";

const HomeScreen = () => {
    const { isAuthenticated, isLoading: isAuthLoading } = useStatus();

    const { user } = useUser();
    // Hooks for authentication actions
    const { isLoading: isOAuthLoading } = useOAuth();
    const { signOut, isLoading: isSignOutLoading } = useSignOut();

    // Hooks for wallet management
    const { activeWallet, wallets, isLoadingWallets } = useWallets();

    // A simple function to log out
    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error("Sign out failed:", error);
        }
    };

    const isLoading = isAuthLoading || isOAuthLoading || isSignOutLoading || isLoadingWallets;

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

                    <button onClick={handleSignOut} style={{ marginTop: "20px" }}>
                        Log Out
                    </button>
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
