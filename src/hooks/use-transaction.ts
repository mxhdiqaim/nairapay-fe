import { useCallback } from "react";
import { parseUnits } from "viem";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { getEnvVariable } from "@/utils";
import axios from "axios";
import { useUser, useWallets } from "@openfort/react";
import { useQuery } from "@tanstack/react-query";

const stablecoinAddress = getEnvVariable("VITE_STABLECOIN_ADDRESS") as `0x${string}`;
const BACKEND_API_URL = getEnvVariable("VITE_BACKEND_URL");

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

export interface Interaction {
    to: `0x${string}`;
    value: string; // String representation of a number
    data: `0x${string}`;
    parsed?: {
        name: string;
        args: any[];
        signature: string;
    } | null;
}

export interface TransactionIntent {
    id: string;
    interactions: Interaction[];
    response?: {
        transactionHash: string;
    };
}

const fetchTransactionHistory = async (playerId: string): Promise<TransactionIntent[]> => {
    const { data } = await axios.get(`${BACKEND_API_URL}/transactions/history/${playerId}`);
    return data;
};

export const useTransactionHistory = () => {
    const { user } = useUser();
    const { isLoadingWallets } = useWallets();
    const playerId = user?.player?.id;

    const {
        data: transactions,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["transactionHistory", playerId],
        queryFn: () => fetchTransactionHistory(playerId!),
        enabled: !isLoadingWallets && !!playerId,
    });

    return {
        transactions: transactions ?? null,
        isLoading: isLoading || isLoadingWallets,
        error: error ? (error as Error).message : null,
    };
};
