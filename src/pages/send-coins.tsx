import { useState } from "react";
import { useWriteContract } from "wagmi";
import { parseUnits } from "viem";
import { Box, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";
import { getEnvVariable } from "@/utils";
import CustomCard from "@/components/ui/custom-card.tsx";

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
const stablecoinAddress = getEnvVariable("VITE_STABLECOIN_ADDRESS") as const;

const SendCoins = () => {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");

    // The wagmi hook for writing to a contract
    const { writeContract, isPending, isSuccess, isError, data: transactionHash, error } = useWriteContract();

    const handleSend = () => {
        if (!recipient || !amount) {
            alert("Please enter a recipient address and amount.");
            return;
        }

        try {
            // Convert the human-readable amount to the contract's required format (wei)
            const amountInWei = parseUnits(amount, 6);

            // Call the `transfer` function on the stablecoin contract
            writeContract({
                address: stablecoinAddress,
                abi: erc20Abi,
                functionName: "transfer",
                args: [recipient, amountInWei],
            });
        } catch (e) {
            console.error("Error preparing transaction:", e);
            alert("Invalid amount or recipient address.");
        }
    };

    return (
        <CustomCard>
            <Box>
                <Typography variant="h6" gutterBottom>
                    Send Stablecoins
                </Typography>
                <Box component="form" noValidate autoComplete="off" sx={{ "& .MuiTextField-root": { mt: 2 } }}>
                    <TextField
                        fullWidth
                        label="Recipient Address"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="0x..."
                    />
                    <TextField
                        fullWidth
                        label="Amount (NGNC)"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                    />
                </Box>
                <Button variant="contained" onClick={handleSend} disabled={isPending} sx={{ mt: 2 }}>
                    {isPending ? <CircularProgress size={24} /> : "Send"}
                </Button>

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
