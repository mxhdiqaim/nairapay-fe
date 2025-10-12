import { Alert, Box, CircularProgress, List, ListItem, Typography, Stack, Chip } from "@mui/material";
import { useTransactionHistory } from "@/hooks/use-transaction.ts";
import { useWallets } from "@openfort/react";
import CustomCard from "@/components/ui/custom-card.tsx";
import type { TransactionIntent } from "@/types";
import { getTransactionDetails } from "@/helpers";

const TransactionScreen = () => {
    const { activeWallet, isLoadingWallets } = useWallets();
    const { transactions, isLoading: isTransactionsLoading, error: transactionsError } = useTransactionHistory();

    const isLoading = isLoadingWallets || isTransactionsLoading;

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (transactionsError) {
        return (
            <CustomCard>
                <Alert severity="error">Error loading transactions: {transactionsError}</Alert>
            </CustomCard>
        );
    }

    if (!transactions || transactions.length === 0) {
        return (
            <CustomCard>
                <Alert severity="info">No transactions found.</Alert>
            </CustomCard>
        );
    }

    return (
        <CustomCard>
            <Typography variant="h6">Transaction History</Typography>
            <List sx={{ width: "100%" }}>
                {transactions.map((tx: TransactionIntent, idx: number) => {
                    const details = getTransactionDetails(tx, activeWallet);

                    if (!details) return;

                    const hash = tx.response?.transactionHash;

                    return (
                        <ListItem key={idx} disablePadding sx={{ mb: 2 }}>
                            <CustomCard variant="outlined" sx={{ width: "100%" }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                                    <Typography variant="body2" color="text.secondary">
                                        <Chip
                                            label={details.type}
                                            color={details.type === "Incoming" ? "success" : "error"}
                                            size="small"
                                        />
                                    </Typography>
                                    <Chip
                                        label={details.isErc20 ? "NGNC" : "MATIC"}
                                        size="medium"
                                        color={details.isErc20 ? "primary" : "default"}
                                    />
                                </Stack>

                                <Typography variant="body1" fontWeight="bold">
                                    Amount sent {details.amount} {details.isErc20 ? "NGNC" : "MATIC"}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" noWrap>
                                    Transferred to {details.recipient}
                                </Typography>

                                <Box>
                                    {hash ? (
                                        <a
                                            href={`https://amoy.polygonscan.com/tx/${hash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: "none", color: "inherit" }}
                                        >
                                            <Typography variant="body2" color="primary">
                                                Transaction Hash {`${hash.slice(0, 6)}...${hash.slice(-4)}`}
                                            </Typography>
                                        </a>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            No Hash
                                        </Typography>
                                    )}
                                </Box>
                            </CustomCard>
                        </ListItem>
                    );
                })}
            </List>
        </CustomCard>
    );
};

export default TransactionScreen;
