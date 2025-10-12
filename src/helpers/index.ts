import { getEnvVariable } from "@/utils";
import type { TransactionIntent } from "@/types";
import type { UserWallet } from "@openfort/react";
import { formatUnits } from "viem";

const stablecoinAddress = getEnvVariable("VITE_STABLECOIN_ADDRESS") as `0x${string}`;

export const getTransactionDetails = (tx: TransactionIntent, wallet: UserWallet | undefined) => {
    if (!wallet || !wallet.address) return null;

    // Find an ERC20 transfer interaction
    const transferInteraction = tx.interactions?.find(
        (interaction) => interaction.to?.toLowerCase() === stablecoinAddress.toLowerCase(),
        // && interaction.functionName.startsWith("transfer"),
    );

    if (!transferInteraction?.functionArgs) return;

    // Arguments are JSON-encoded strings, so we need to parse them.
    const recipient = JSON.parse(transferInteraction.functionArgs[0]);
    const value = JSON.parse(transferInteraction.functionArgs[1].trim());

    if (value === "" || !/^\d+$/.test(value)) {
        console.log("value:", value);
        // If the value is empty or contains non-digit characters, treat it as 0
        return null;
    }

    // Basic validation check
    const type = recipient.toLowerCase() === wallet.address.toLowerCase() ? "Incoming" : "Outgoing";
    return {
        type,
        recipient,
        isErc20: true,
        amount: formatUnits(BigInt(value), 6),
    };
};
