import { useState } from "react";
import QRCode from "react-qr-code";
import { useWallets } from "@openfort/react";
import { Box, Typography, Button, Stack, Alert, CircularProgress } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CustomCard from "@/components/ui/custom-card.tsx";
import useScreenSize from "@/hooks/use-screen-size.ts";

const ReceiveCoins = () => {
    const { activeWallet, isLoadingWallets } = useWallets();
    const [isCopied, setIsCopied] = useState(false);
    const screenSize = useScreenSize();

    const handleCopy = async () => {
        if (!activeWallet?.address) {
            return;
        }

        try {
            await navigator.clipboard.writeText(activeWallet.address);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset the state after 2 seconds
        } catch (err) {
            console.error("Failed to copy address: ", err);
        }
    };

    if (isLoadingWallets) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!activeWallet) {
        return (
            <CustomCard>
                <Alert severity="warning">No active wallet found. Please log in again.</Alert>
            </CustomCard>
        );
    }

    return (
        <CustomCard>
            <Stack spacing={3} alignItems="center">
                <Typography variant="h6" gutterBottom textAlign="center">
                    Scan to Receive Funds
                </Typography>

                <Box sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: "8px", bgcolor: "white" }}>
                    {activeWallet.address && (
                        <QRCode value={activeWallet.address} size={screenSize === "mobile" ? 180 : 256} />
                    )}
                </Box>

                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ wordBreak: "break-all", fontFamily: "monospace" }}>
                        {activeWallet.address}
                    </Typography>
                    <Button onClick={handleCopy} size="small" sx={{ minWidth: "auto", p: 0.5 }}>
                        <ContentCopyIcon fontSize="small" />
                    </Button>
                </Stack>

                {isCopied && (
                    <Typography variant="caption" color="success.main">
                        Address copied!
                    </Typography>
                )}
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                    Share this address with anyone who wants to send you NGNC.
                </Typography>
            </Stack>
        </CustomCard>
    );
};

export default ReceiveCoins;
