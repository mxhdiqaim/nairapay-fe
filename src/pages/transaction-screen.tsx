import { Alert, Box, CircularProgress, List, ListItem, Typography, Stack, Chip } from "@mui/material";
import { useTransactionHistory, type TransactionIntent } from "@/hooks/use-transaction.ts";
import { useWallets } from "@openfort/react";
import { formatUnits } from "viem";
import CustomCard from "@/components/ui/custom-card.tsx";
import { getEnvVariable } from "@/utils";

const stablecoinAddress = getEnvVariable("VITE_STABLECOIN_ADDRESS") as `0x${string}`;

const TransactionScreen = () => {
    const { activeWallet, isLoadingWallets } = useWallets();
    const { transactions, isLoading: isTransactionsLoading, error: transactionsError } = useTransactionHistory();

    const isLoading = isLoadingWallets || isTransactionsLoading;

    const getTransactionDetails = (tx: TransactionIntent) => {
        if (!activeWallet) return null; // Ensure activeWallet is available

        // Find an ERC20 transfer interaction
        const transferInteraction = tx.interactions?.find(
            (interaction) =>
                interaction.to?.toLowerCase() === stablecoinAddress.toLowerCase() &&
                interaction.functionName.startsWith("transfer"), // Use strict equality for function name
        );

        if (!transferInteraction) return;

        // FIX: Access arguments directly as strings. Remove JSON.parse().
        const recipient = transferInteraction.functionArgs[0];
        const value = transferInteraction.functionArgs[1].trim();

        if (value === "" || !/^\d+$/.test(value)) {
            console.log("value:", value);
            // If the value is empty or contains non-digit characters, treat it as 0
            return null;
        }

        // Basic validation check
        const type = recipient.toLowerCase() === activeWallet.address.toLowerCase() ? "Incoming" : "Outgoing";
        return {
            isErc20: true,
            type: type,
            recipient: recipient,
            // Convert the string-encoded BigInt value to a formatted string
            amount: formatUnits(BigInt(value), 6),
        };
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

    // const visibleTransactions = transactions?.map(getTransactionDetails).filter(Boolean);

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
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {transactions.map((tx: TransactionIntent) => {
                    const details = getTransactionDetails(tx);
                    console.log("details:", details);

                    if (!details) return null;

                    const hash = tx.response?.transactionHash;

                    return (
                        <ListItem disablePadding sx={{ my: 1 }}>
                            <CustomCard sx={{ width: "100%" }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                                    <Typography variant="body2" color="text.secondary">
                                        Type: **type**
                                    </Typography>
                                    <Chip label={"NGNC"} size="small" color={"primary"} />
                                </Stack>
                                <Typography variant="body1" fontWeight="bold">
                                    {/*Amount: {formatUnits(BigInt(tx.interactions[0].functionArgs[1]), 6)} {"NGNC"}*/}
                                    Amount: 320 NGNC
                                </Typography>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    To: {tx.interactions[0].functionArgs[0]}
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
                            </CustomCard>
                        </ListItem>
                    );
                })}
            </List>
        </CustomCard>
    );

    // return (
    //     <CustomCard>
    //         <Typography variant="h6" sx={{ mb: 1 }}>
    //             Transaction History
    //         </Typography>
    //         <List sx={{ width: "100%", bgcolor: "background.paper" }}>
    //             {transactions?.map((tx: TransactionIntent) => {
    //                 const details = getTransactionDetails(tx);
    //                 if (!details) return null;
    //
    //                 const hash = tx.response?.transactionHash;
    //
    //                 return (
    //                     <ListItem key={tx.id} disablePadding sx={{ my: 1 }}>
    //                         <Card variant="outlined" sx={{ width: "100%" }}>
    //                             <CardContent>
    //                                 <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
    //                                     <Typography variant="body2" color="text.secondary">
    //                                         Type: **{details.type}**
    //                                     </Typography>
    //                                     <Chip
    //                                         label={details.isErc20 ? "NGNC" : "MATIC"}
    //                                         size="small"
    //                                         color={details.isErc20 ? "primary" : "default"}
    //                                     />
    //                                 </Stack>
    //
    //                                 <Typography variant="body1" fontWeight="bold">
    //                                     Amount: {details.amount} {details.isErc20 ? "NGNC" : "MATIC"}
    //                                 </Typography>
    //
    //                                 <Typography variant="body2" color="text.secondary" noWrap>
    //                                     To: {details.recipient}
    //                                 </Typography>
    //
    //                                 <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }} noWrap>
    //                                     Hash:{" "}
    //                                     {hash ? (
    //                                         <a
    //                                             href={`https://amoy.polygonscan.com/tx/${hash}`}
    //                                             target="_blank"
    //                                             rel="noopener noreferrer"
    //                                         >
    //                                             {hash.slice(0, 10)}...
    //                                         </a>
    //                                     ) : (
    //                                         "N/A"
    //                                     )}
    //                                 </Typography>
    //                             </CardContent>
    //                         </Card>
    //                     </ListItem>
    //                 );
    //             })}
    //         </List>
    //     </CustomCard>
    // );
};

export default TransactionScreen;
