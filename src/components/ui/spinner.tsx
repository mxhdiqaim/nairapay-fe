import { Box, Skeleton, useTheme } from "@mui/material";

const PageSkeleton = () => {
    const theme = useTheme();
    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            {/* Sidebar Skeleton */}
            <Box
                sx={{
                    width: theme.layout.sidebarWidth,
                    p: 2,
                    borderRight: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                }}
            >
                <Skeleton variant="text" width="100%" height={40} sx={{ mb: 2 }} />
                {Array.from(new Array(4)).map((_, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Skeleton variant="text" width={36} height={60} sx={{ mr: 1.5 }} />
                        <Skeleton variant="text" width="80%" height={60} />
                    </Box>
                ))}
            </Box>

            {/* Main Content Skeleton */}
            <Box sx={{ flexGrow: 1, p: 3 }}>
                {/* Header Skeleton */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        mb: 4,
                    }}
                >
                    <Skeleton variant="text" width={250} height={50} sx={{ mr: 2 }} />
                    <Skeleton variant="circular" width={40} height={40} />
                </Box>

                {/* Content Area Skeleton */}
                <Skeleton variant="rectangular" width="100%" height="80%" />
            </Box>
        </Box>
    );
};

export default PageSkeleton;

// const AppSkeleton = () => {
//     const theme = useTheme();
//     const sidebarWidth = theme.layout.sidebarWidth; // A standard sidebar width
//     const appBarHeight = theme.layout.appBarHeight; // Height of the app bar
//
//     return (
//         <Box sx={{ display: "flex", overflow: "hidden" }}>
//             <Box
//                 component="main"
//                 sx={{
//                     flexGrow: 1,
//                     width: `calc(100% - ${sidebarWidth}px)`,
//                     bgcolor: "background.default",
//                 }}
//             >
//                 {/* Top App Bar Skeleton */}
//                 <Skeleton
//                     variant="rectangular"
//                     height={`calc(100vh - ${appBarHeight * 1.5}px)`}
//                     animation="wave"
//                     sx={{ borderRadius: 1 }}
//                 />
//             </Box>
//         </Box>
//     );
// };
//
// export default AppSkeleton;
