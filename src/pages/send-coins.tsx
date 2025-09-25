import { useWriteContract } from "wagmi";
import { parseUnits } from "viem";
import { Box, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getEnvVariable } from "@/utils";
import CustomCard from "@/components/ui/custom-card.tsx";
import useNotifier from "@/hooks/use-notifier.ts";
import { validationSchema, type FormData } from "@/types";

// ABI for a standard ERC-20 token
const erc20Abi = [
    {
        name: "transfer",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
            { name: "to", type: "address" },
            { name: "value", type: "uint256" },
        ],
        outputs: [{ type: "bool" }],
    },
] as const;

// USDC testnet token address on Polygon Amoy
const stablecoinAddress = getEnvVariable("VITE_STABLECOIN_ADDRESS") as `0x${string}`;

const SendCoins = () => {
    const notify = useNotifier();
    const { writeContract, isPending, isSuccess, isError, data: transactionHash, error } = useWriteContract();

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
            const amountInWei = parseUnits(String(data.amount), 6);
            writeContract({
                address: stablecoinAddress,
                abi: erc20Abi,
                functionName: "transfer",
                args: [data.recipient as `0x${string}`, amountInWei],
            });
        } catch (e) {
            console.error("Error preparing transaction:", e);
            notify("An unexpected error occurred.", "error");
        }
    };

    return (
        <CustomCard>
            <Box>
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
                    <Button type="submit" variant="contained" disabled={isPending} sx={{ mt: 3 }}>
                        {isPending ? <CircularProgress size={24} /> : "Send"}
                    </Button>
                </Box>

                {isPending && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Transaction pending...
                    </Typography>
                )}
                {isSuccess && (
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
                {isError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        Transaction failed: {error?.message}
                    </Alert>
                )}
            </Box>
        </CustomCard>
    );
};

export default SendCoins;
