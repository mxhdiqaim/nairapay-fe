import { useState } from "react";
import { formatUnits, type Hex } from "viem";
import { useReadContract } from "wagmi";
import { embeddedWalletId, useStatus, useUser, useWallets } from "@openfort/react";
import { Alert, Box, Button, Chip, CircularProgress, Divider, List, ListItem, Stack, Typography } from "@mui/material";
import CustomCard from "@/components/ui/custom-card.tsx";
import { getEnvVariable } from "@/utils";
import CreateWallet from "@/components/create-wallet.tsx";
import useNotifier from "@/hooks/use-notifier.ts";
import { homeErc20Abi } from "@/constant";

// USDC testnet token address on Polygon Amoy
const stablecoinAddress = getEnvVariable("VITE_STABLECOIN_ADDRESS");

const HomeScreen = () => {
    const { user } = useUser();
    const { isLoading: isAuthLoading } = useStatus();
    const { activeWallet, wallets, isLoadingWallets, setActiveWallet } = useWallets();
    const notify = useNotifier();
    const [isSwitching, setIsSwitching] = useState(false);

    const {
        data: balance,
        isLoading: isBalanceLoading,
        error: balanceError,
    } = useReadContract({
        address: stablecoinAddress,
        abi: homeErc20Abi,
        functionName: "balanceOf",
        args: [activeWallet?.address as `0x${string}`],
        query: {
            enabled: !!activeWallet?.address,
        },
    });

    const handleChangeWallet = async (address: Hex) => {
        setIsSwitching(true);
        try {
            const result = await setActiveWallet({
                walletId: embeddedWalletId,
                address,
            });

            // Check if the result has an error
            if (result && "error" in result) {
                console.error("Error changing active wallet:", result.error);
                notify("Failed to change active wallet.", "error");
                return;
            }

            console.log("Active wallet changed to:", result);
            notify("Active wallet changed successfully", "success");
        } catch (error) {
            console.error("Error changing active wallet:", error);
            notify("Failed to change active wallet.", "error");
        } finally {
            setIsSwitching(false);
        }
    };

    const formattedBalance = balance ? formatUnits(balance, 6) : "0.00";

    const isLoading = isAuthLoading || isLoadingWallets || isBalanceLoading;

    // Show loading if we're in the general loading state or switching wallets
    if (isLoading || isSwitching) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    // Only show CreateWallet if there are no wallets at all
    if (wallets.length === 0) {
        return <CreateWallet />;
    }

    // If we have wallets but no active wallet, this might be a temporary state
    if (!activeWallet) {
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

                <Stack spacing={3}>
                    <Box>
                        <Typography variant="h6">Your Active Wallet</Typography>
                        <Chip label={activeWallet.address} variant="outlined" sx={{ mt: 1, fontFamily: "monospace" }} />
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
                                            <ListItem
                                                key={w.address}
                                                disableGutters
                                                sx={{ my: 3 }}
                                                secondaryAction={
                                                    <Button
                                                        size="small"
                                                        onClick={() => handleChangeWallet(w.address)}
                                                        disabled={isSwitching}
                                                        variant={"contained"}
                                                    >
                                                        Set Active
                                                    </Button>
                                                }
                                            >
                                                <Chip label={w.address} size="small" sx={{ fontFamily: "monospace" }} />
                                            </ListItem>
                                        ))}
                                </List>
                            </Box>
                        </>
                    )}
                </Stack>
            </CustomCard>
        </Box>
    );
};

export default HomeScreen;
