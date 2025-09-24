import { useStatus, useOAuth, useSignOut, useWallets, useUser } from "@openfort/react";
import { useReadContract } from "wagmi";
import { formatUnits } from "viem";
import {
    Box,
    Typography,
    CircularProgress,
    Divider,
    List,
    ListItem,
    Alert,
    Chip,
    Stack,
    Skeleton,
} from "@mui/material";
import CustomCard from "@/components/ui/custom-card.tsx";

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
    const { isLoading: isAuthLoading } = useStatus();
    const { user } = useUser();
    const { isLoading: isOAuthLoading } = useOAuth();
    const { isLoading: isSignOutLoading } = useSignOut();
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

    const isLoading = isAuthLoading || isOAuthLoading || isSignOutLoading;
    const formattedBalance = balance ? formatUnits(balance, 6) : "0.00";

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
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Welcome, {user?.player?.name || "User"}!
                    </Typography>

                    {isLoadingWallets ? (
                        <Skeleton variant="rectangular" height={100} />
                    ) : activeWallet ? (
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
                                    Your Stablecoin Balance
                                </Typography>
                                {isBalanceLoading ? (
                                    <Skeleton width="100px" />
                                ) : balanceError ? (
                                    <Alert severity="error">
                                        Error loading balance. Make sure your network is set to Polygon Amoy.
                                    </Alert>
                                ) : (
                                    <Typography variant="h5" component="p" fontWeight="bold" color="primary">
                                        {formattedBalance} USDC
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
                        <Alert severity="warning">
                            No active wallet found. A wallet should be created automatically.
                        </Alert>
                    )}
                </Box>
            </CustomCard>
        </Box>
    );
};

export default HomeScreen;
