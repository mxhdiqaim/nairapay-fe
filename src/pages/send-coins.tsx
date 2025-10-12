import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStatus, useWallets } from "@openfort/react";
import CustomCard from "@/components/ui/custom-card.tsx";
import useNotifier from "@/hooks/use-notifier.ts";
import { validationSchema, type FormData } from "@/types";
import { useSendTransaction } from "@/hooks/use-transaction.ts";
import SendCoinsSkeleton from "@/components/skeletons/sendcoin-skeleton.tsx";

const SendCoins = () => {
    const notify = useNotifier();
    const { isLoading: isAuthLoading } = useStatus();
    const { isLoadingWallets } = useWallets();
    const {
        sendTransaction,
        hash: transactionHash,
        isPending,
        isConfirming,
        isConfirmed,
        error,
    } = useSendTransaction();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            recipient: "",
            amount: undefined,
        },
    });

    const onSubmit = (data: FormData) => {
        try {
            sendTransaction(data.recipient as `0x${string}`, String(data.amount));
            notify("Transaction submitted. Awaiting confirmation...", "info");
        } catch (err) {
            console.error("Error preparing transaction:", err);
            notify("An unexpected error occurred.", "error");
        }
    };

    if (isAuthLoading || isLoadingWallets) {
        return <SendCoinsSkeleton />;
    }

    return (
        <CustomCard>
            <Typography variant="h6" gutterBottom>
                Send Stablecoins
            </Typography>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="recipient"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Recipient Address"
                            placeholder="0x..."
                            error={!!errors.recipient}
                            helperText={errors.recipient?.message}
                            sx={{ mt: 2 }}
                        />
                    )}
                />
                <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Amount (NGNC)"
                            type="number"
                            placeholder="0.00"
                            error={!!errors.amount}
                            helperText={errors.amount?.message}
                            sx={{ mt: 2 }}
                        />
                    )}
                />
                <Button type="submit" variant="contained" disabled={isPending || isConfirming} sx={{ mt: 2 }}>
                    {isPending ? "Preparing..." : isConfirming ? "Confirming..." : "Send"}
                </Button>
            </Box>

            {isConfirmed && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Transaction successful! Hash:{" "}
                    <a
                        href={`https://amoy.polygonscan.com/tx/${transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {transactionHash}
                    </a>
                </Alert>
            )}
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    Transaction failed: {error.message}
                </Alert>
            )}
        </CustomCard>
    );
};

export default SendCoins;
