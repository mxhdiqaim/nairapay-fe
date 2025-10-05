import {
    Alert,
    Box,
    Card,
    CardContent,
    CircularProgress,
    List,
    ListItem,
    Typography,
    Stack,
    Chip,
} from "@mui/material";
import { useTransactionHistory, type TransactionIntent } from "@/hooks/use-transaction.ts";
import { useWallets } from "@openfort/react";
import { formatUnits } from "viem";
import CustomCard from "@/components/ui/custom-card.tsx";
import { getEnvVariable } from "@/utils";

const stablecoinAddress = getEnvVariable("VITE_STABLECOIN_ADDRESS") as `0x${string}`;

const TransactionScreen = () => {
    const { activeWallet, isLoadingWallets } = useWallets();
    const { transactions, isLoading: isTransactionsLoading, error: transactionsError } = useTransactionHistory();

    console.log("Transactions:", transactions);

    const isLoading = isLoadingWallets || isTransactionsLoading;

    const getTransactionDetails = (tx: TransactionIntent) => {
        if (!tx.interactions?.length) {
            return null;
        }
        // For simplicity, we'll analyze the first interaction.
        const interaction = tx.interactions[0];

        // Case 1: ERC20 Transfer (to stablecoin address with 'transfer' function)
        if (
            interaction.to?.toLowerCase() === stablecoinAddress.toLowerCase() &&
            interaction.parsed?.name === "transfer"
        ) {
            const recipient = interaction.parsed.args?.[0];
            const value = interaction.parsed.args?.[1];
            return {
                isErc20: true,
                type: recipient?.toLowerCase() === activeWallet?.address.toLowerCase() ? "Incoming" : "Outgoing",
                recipient,
                amount: value ? formatUnits(BigInt(value), 6) : "0", // 6 decimals for NGNC
            };
        }

        // Case 2: Native Currency Transfer (e.g., MATIC, with a value and no data)
        if (interaction.value && BigInt(interaction.value) > 0n && (!interaction.data || interaction.data === "0x")) {
            return {
                isErc20: false,
                type: interaction.to?.toLowerCase() === activeWallet?.address.toLowerCase() ? "Incoming" : "Outgoing",
                recipient: interaction.to,
                amount: formatUnits(BigInt(interaction.value), 18), // 18 decimals for MATIC
            };
        }

        // It's a different kind of transaction we don't display yet.
        return null;
    };

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

    const visibleTransactions = transactions?.map(getTransactionDetails).filter(Boolean);

    if (!visibleTransactions || visibleTransactions.length === 0) {
        return (
            <CustomCard>
                <Alert severity="info">No transactions found.</Alert>
            </CustomCard>
        );
    }

    return (
        <CustomCard>
            <Typography variant="h6" sx={{ mb: 1 }}>
                Transaction History
            </Typography>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {transactions?.map((tx: TransactionIntent) => {
                    const details = getTransactionDetails(tx);
                    if (!details) return null;

                    const hash = tx.response?.transactionHash;

                    return (
                        <ListItem key={tx.id} disablePadding sx={{ my: 1 }}>
                            <Card variant="outlined" sx={{ width: "100%" }}>
                                <CardContent>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                                        <Typography variant="body2" color="text.secondary">
                                            Type: **{details.type}**
                                        </Typography>
                                        <Chip
                                            label={details.isErc20 ? "NGNC" : "MATIC"}
                                            size="small"
                                            color={details.isErc20 ? "primary" : "default"}
                                        />
                                    </Stack>

                                    <Typography variant="body1" fontWeight="bold">
                                        Amount: {details.amount} {details.isErc20 ? "NGNC" : "MATIC"}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary" noWrap>
                                        To: {details.recipient}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }} noWrap>
                                        Hash:{" "}
                                        {hash ? (
                                            <a
                                                href={`https://amoy.polygonscan.com/tx/${hash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {hash.slice(0, 10)}...
                                            </a>
                                        ) : (
                                            "N/A"
                                        )}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </ListItem>
                    );
                })}
            </List>
        </CustomCard>
    );
};

export default TransactionScreen;
