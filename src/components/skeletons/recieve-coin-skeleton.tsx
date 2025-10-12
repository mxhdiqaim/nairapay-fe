import { Skeleton, Stack } from "@mui/material";
import CustomCard from "@/components/ui/custom-card.tsx";

const ReceiveCoinsSkeleton = () => {
    return (
        <CustomCard>
            <Stack spacing={3} alignItems="center">
                <Skeleton variant="text" width="60%" height={32} />
                <Skeleton variant="rectangular" width={256} height={256} />
                <Stack direction="row" spacing={1} alignItems="center" width="80%">
                    <Skeleton variant="text" width="100%" height={24} />
                </Stack>
                <Skeleton variant="text" width="70%" height={20} />
            </Stack>
        </CustomCard>
    );
};

export default ReceiveCoinsSkeleton;
