import { useState, useEffect } from "react";
import type { Transaction } from "viem";
import { getEnvVariable } from "@/utils";

// Polygon Amoy's Chain ID
const amoyChainId = 80002 as const;
const polygonscanApiKey = getEnvVariable("VITE_POLYGONSCAN_API_KEY") as const;

export const useTransactions = (address: string | undefined) => {
    const [transactions, setTransactions] = useState<Transaction[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isEnabled = !!address && !!polygonscanApiKey;

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!isEnabled) {
                return;
            }

            setIsLoading(true);
            setError(null);

            // Updated URL to use the V2 endpoint with chainid
            const apiUrl = `https://api.etherscan.io/v2/api?chainid=${amoyChainId}&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${polygonscanApiKey}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.status === "1") {
                    setTransactions(data.result);
                } else if (data.status === "0") {
                    if (data.result === "Invalid API Key") {
                        setError("Invalid API Key. Please check your .env file or try a new key.");
                    } else if (data.result === "No transactions found") {
                        setError("No transactions found for this address.");
                        setTransactions([]);
                    } else {
                        // Handle the case where the result is blank or an unknown error
                        const errorMessage = data.result || "An unknown API error occurred. Please try again later.";
                        setError(`API Error: ${errorMessage}`);
                    }
                } else {
                    throw new Error(data.message || "An unknown error occurred.");
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError("An unknown error occurred.");
                }
                console.error("Failed to fetch transactions:", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, [address, isEnabled]);

    return { transactions, isLoading, error };
};
