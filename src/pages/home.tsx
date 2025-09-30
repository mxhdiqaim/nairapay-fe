import { formatUnits } from "viem";
import { useReadContract } from "wagmi";
import { useStatus, useUser, useWallets } from "@openfort/react";
import { Alert, Box, Chip, CircularProgress, Divider, List, ListItem, Stack, Typography } from "@mui/material";
import CustomCard from "@/components/ui/custom-card.tsx";
import { getEnvVariable } from "@/utils";
import CreateWallet from "@/components/create-wallet.tsx";

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
const stablecoinAddress = getEnvVariable("VITE_STABLECOIN_ADDRESS");

const HomeScreen = () => {
    const { isLoading: isAuthLoading } = useStatus();
    const { user } = useUser();
    const { activeWallet, wallets, isLoadingWallets } = useWallets();

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
            enabled: !!activeWallet?.address,
        },
    });

    const formattedBalance = balance ? formatUnits(balance, 6) : "0.00";

    const isLoading = isAuthLoading || isLoadingWallets || isBalanceLoading;

    // New conditional rendering logic
    if (!activeWallet) {
        return <CreateWallet />;
    }

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box alignItems="center">
            <CustomCard>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h4" gutterBottom>
                        Welcome, {user?.player?.name || "User"}!
                    </Typography>
                </Box>

                {activeWallet ? (
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="h6">Your Active Wallet</Typography>
                            <Chip
                                label={activeWallet.address}
                                variant="outlined"
                                sx={{ mt: 1, fontFamily: "monospace" }}
                            />
                        </Box>
                        <Divider />
                        <Box>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Your Balance
                            </Typography>
                            {balanceError ? (
                                <Alert severity="error">
                                    Error loading balance. Make sure your network is set to Polygon Amoy.
                                </Alert>
                            ) : (
                                <Typography variant="h5" component="p" fontWeight="bold" color="primary">
                                    NGNC {formattedBalance}
                                </Typography>
                            )}
                        </Box>

                        {wallets.length > 1 && (
                            <>
                                <Divider />
                                <Box>
                                    <Typography variant="h6">Other Wallets</Typography>
                                    <List dense>
                                        {wallets
                                            .filter((w) => w.address !== activeWallet.address)
                                            .map((w) => (
                                                <ListItem key={w.address} disableGutters>
                                                    <Chip
                                                        label={w.address}
                                                        size="small"
                                                        sx={{ fontFamily: "monospace" }}
                                                    />
                                                </ListItem>
                                            ))}
                                    </List>
                                </Box>
                            </>
                        )}
                    </Stack>
                ) : (
                    <Alert severity="warning">No active wallet found. A wallet should be created automatically.</Alert>
                )}
            </CustomCard>
        </Box>
    );
};

export default HomeScreen;
