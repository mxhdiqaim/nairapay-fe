import { Alert, Box, CircularProgress, List, ListItem, Skeleton, Typography } from "@mui/material";
import { useTransactions } from "@/hooks/use-transaction.ts";
import { useWallets } from "@openfort/react";
import { formatUnits } from "viem";

const TransactionScreen = () => {
    const { activeWallet, isLoadingWallets } = useWallets();
    const {
        transactions,
        isLoading: isTransactionsLoading,
        error: transactionsError,
    } = useTransactions(activeWallet?.address);

    const isLoading = isLoadingWallets || isTransactionsLoading;

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
                Transaction History
            </Typography>
            {isTransactionsLoading ? (
                <Skeleton variant="rectangular" height={200} />
            ) : transactionsError ? (
                <Alert severity="error">Error loading transactions: {transactionsError}</Alert>
            ) : (
                <List>
                    {transactions && transactions.length > 0 ? (
                        transactions.map((tx: any) => (
                            <ListItem key={tx.hash} disableGutters>
                                <Card variant="outlined" sx={{ width: "100%", my: 1 }}>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            **Type:**{" "}
                                            {tx.from.toLowerCase() === activeWallet.address.toLowerCase()
                                                ? "Outgoing"
                                                : "Incoming"}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            **Value:** {formatUnits(BigInt(tx.value), 18)} MATIC
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            **To:** {tx.to}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            **Hash:**{" "}
                                            <a
                                                href={`https://amoy.polygonscan.com/tx/${tx.hash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {tx.hash.slice(0, 10)}...
                                            </a>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </ListItem>
                        ))
                    ) : (
                        <Alert severity="info">No transactions found for this address.</Alert>
                    )}
                </List>
            )}
        </Box>
    );
};

export default TransactionScreen;
