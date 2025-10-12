import { alpha, AppBar, IconButton, Toolbar, useTheme } from "@mui/material";
import { type FC } from "react";
import useScreenSize from "@/hooks/use-screen-size.ts";
import MenuIcon from "@mui/icons-material/Menu";

export interface Props {
    toggleDrawer?: (open: boolean) => void;
    drawerState?: boolean;
}

const Appbar: FC<Props> = ({ toggleDrawer, drawerState }) => {
    const theme = useTheme();
    const screenSize = useScreenSize();

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
            <Toolbar>
                {(screenSize === "mobile" || screenSize === "tablet") && (
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => toggleDrawer && toggleDrawer(!drawerState)}
                        sx={{ borderRadius: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;
