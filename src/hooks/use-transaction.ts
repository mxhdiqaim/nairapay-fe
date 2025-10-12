import { useCallback } from "react";
import { parseUnits } from "viem";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { getEnvVariable } from "@/utils";
import { useUser, useWallets } from "@openfort/react";
import { useQuery } from "@tanstack/react-query";
import { erc20Abi } from "@/constant";
import type { TransactionIntent } from "@/types";

const stablecoinAddress = getEnvVariable("VITE_STABLECOIN_ADDRESS") as `0x${string}`;
const BACKEND_API_URL = getEnvVariable("VITE_BACKEND_URL");

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

const fetchTransactionHistory = async (playerId: string): Promise<TransactionIntent[]> => {
    const response = await fetch(`${BACKEND_API_URL}/api/transactions/history/${playerId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch transaction history");
    }

    return response.json();
};

export const useTransactionHistory = () => {
    const { user } = useUser();
    const { isLoadingWallets } = useWallets();
    const playerId = user?.id;

    console.log("Fetching transactions for playerId:", playerId);

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
