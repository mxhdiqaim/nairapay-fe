import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import CustomCard from "@/components/ui/custom-card.tsx";

const SendCoinsSkeleton = () => {
    return (
        <CustomCard>
            <Typography variant="h6" gutterBottom>
                <Skeleton variant="text" width="40%" />
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                <Stack spacing={2} mt={2}>
                    <Skeleton variant="rounded" width="100%" height={56} />
                    <Skeleton variant="rounded" width="100%" height={56} />
                    <Button disabled sx={{ mt: 2, width: "100px" }}>
                        <Skeleton width="100%" />
                    </Button>
                </Stack>
            </Box>
        </CustomCard>
    );
};

export default SendCoinsSkeleton;
