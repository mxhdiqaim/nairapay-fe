import { useCallback } from "react";
import { parseUnits } from "viem";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { getEnvVariable } from "@/utils";

const stablecoinAddress = getEnvVariable("VITE_STABLECOIN_ADDRESS") as `0x${string}`;

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

export const useSendTransaction = () => {
    const { address } = useAccount();
    const { writeContract, data: hash, isPending, error } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

    const sendTransaction = useCallback(
        (to: `0x${string}`, amount: string) => {
            if (!address) {
                console.error("Wallet not connected");
                return;
            }

            const amountInWei = parseUnits(amount, 6);

            // Use the `writeContract` function here
            writeContract({
                address: stablecoinAddress,
                abi: erc20Abi,
                functionName: "transfer",
                args: [to, amountInWei],
            });
        },
        [address, writeContract],
    );

    return {
        sendTransaction,
        hash,
        isPending,
        isConfirming,
        isConfirmed,
        error,
    };
};
