import { useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { OpenfortButton, useStatus } from "@openfort/react";
import { useLocation, useNavigate } from "react-router-dom";
import useNotifier from "@/hooks/use-notifier.ts";

const AuthScreen = () => {
    const notify = useNotifier();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the authentication status from the Openfort SDK
    const { isAuthenticated, isLoading } = useStatus();

    // Get the path the user was trying to access before being redirected
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        // Check if the user is authenticated and not currently loading.
        if (isAuthenticated && !isLoading) {
            // Show a success notification
            notify("Successfully logged in", "success");
            // Navigate to the intended page or a default route.
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, isLoading, navigate, from, notify]);

    return (
        <Grid container spacing={2}>
            <Grid
                size={12}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    m: { xs: 3, md: 0 },
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: {
                            xs: "100%",
                            sm: "400px",
                        },
                    }}
                >
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant={"h4"} sx={{ fontWeight: 600 }}>
                            NairaPay
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            my: 2,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            component={OpenfortButton}
                            showAvatar={true}
                            showBalance={true}
                            label={"Login"}
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default AuthScreen;
