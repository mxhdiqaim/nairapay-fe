import { alpha, AppBar, Typography, useTheme } from "@mui/material";
import { type FC } from "react";

export interface Props {
    toggleDrawer?: (open: boolean) => void;
    drawerState?: boolean;
}

const AppbarComponent: FC<Props> = () => {
    const theme = useTheme();

    return (
        <AppBar
            position="sticky"
            sx={{
                background: alpha(theme.palette.background.paper, 0.6),
                height: theme.layout.appBarHeight,
                boxShadow: "none",
                backdropFilter: "blur(8px)",
                borderBottom: `1px solid ${theme.palette.divider}`,
                width: { md: `calc(100% - ${theme.layout.sidebarWidth})` },
            }}
        >
            <Typography variant={"h4"}>NairaPay</Typography>
        </AppBar>
    );
};

export default AppbarComponent;
