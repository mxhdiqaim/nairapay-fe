import { type FC, type ReactNode, useState } from "react";
import { Box, useTheme } from "@mui/material";
import AppbarComponent from "./appbar.tsx";
import SideBar from "./sidebar.tsx";
import useScreenSize from "@/hooks/use-screen-size.ts";
import CustomDrawer from "@/components/ui/custom-drawer";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    const screenSize = useScreenSize();
    const theme = useTheme();
    const [drawerState, setDrawerState] = useState(false);

    const showDrawer = screenSize === "mobile" || screenSize === "tablet";

    const toggleDrawer = (open: boolean) => {
        setDrawerState(open);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            {/* Sidebar */}
            {showDrawer ? (
                <CustomDrawer
                    anchor="left"
                    open={drawerState}
                    onClose={() => toggleDrawer(false)}
                    onOpen={() => toggleDrawer(true)}
                    sx={{
                        "& .MuiDrawer-paper": {
                            width: "83vw",
                        },
                    }}
                >
                    <SideBar {...{ toggleDrawer, drawerState }} />
                </CustomDrawer>
            ) : (
                <SideBar />
            )}

            {/* Main content area */}

            <Box sx={{ flexGrow: 1 }}>
                <AppbarComponent {...{ toggleDrawer, drawerState }} />

                {/* Main content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 2,
                        px: 3,
                        maxWidth: { xs: "100vw", md: `calc(100vw - ${theme.layout.sidebarWidth}px) !important` },
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
