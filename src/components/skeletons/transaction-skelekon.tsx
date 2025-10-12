import { List, ListItem, Skeleton, Stack, Typography } from "@mui/material";
import CustomCard from "@/components/ui/custom-card.tsx";

const TransactionSkeleton = () => {
    const renderSkeletonItem = (key: number) => (
        <ListItem key={key} disablePadding sx={{ mb: 2 }}>
            <CustomCard variant="outlined" sx={{ width: "100%" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Skeleton variant="rounded" width={80} height={24} />
                    <Skeleton variant="rounded" width={60} height={24} />
                </Stack>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="50%" height={20} />
            </CustomCard>
        </ListItem>
    );

    return (
        <CustomCard>
            <Typography variant="h6">
                <Skeleton width="40%" />
            </Typography>
            <List sx={{ width: "100%" }}>{[...Array(3)].map((_, index) => renderSkeletonItem(index))}</List>
        </CustomCard>
    );
};

export default TransactionSkeleton;
