import { Box, Divider, List, ListItem, Skeleton, Stack } from "@mui/material";
import CustomCard from "@/components/ui/custom-card.tsx";

const HomeSkeleton = () => {
    return (
        <Box alignItems="center">
            <CustomCard>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Skeleton variant="text" width="40%" height={48} />
                </Box>

                <Stack spacing={3} mt={2}>
                    <Box>
                        <Skeleton variant="text" width="30%" height={32} />
                        <Skeleton variant="rounded" width="80%" height={32} sx={{ mt: 1 }} />
                    </Box>
                    <Divider />
                    <Box>
                        <Skeleton variant="text" width="25%" height={32} sx={{ mb: 1 }} />
                        <Skeleton variant="text" width="35%" height={40} />
                    </Box>
                    <Divider />
                    <Box>
                        <Skeleton variant="text" width="30%" height={32} />
                        <List dense>
                            <ListItem
                                disableGutters
                                sx={{ my: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}
                            >
                                <Skeleton variant="rounded" width="70%" height={24} />
                                <Skeleton variant="rounded" width="20%" height={30} />
                            </ListItem>
                        </List>
                    </Box>
                </Stack>
            </CustomCard>
        </Box>
    );
};

export default HomeSkeleton;
