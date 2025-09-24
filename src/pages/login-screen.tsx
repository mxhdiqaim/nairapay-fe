import { Box, Button, Grid, Typography } from "@mui/material";
import { OpenfortButton, useOAuth } from "@openfort/react";
import { useLocation, useNavigate } from "react-router-dom";
import useNotifier from "@/hooks/use-notifier.ts";

const LoginScreen = () => {
    const notify = useNotifier();
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoading } = useOAuth();

    // Get the path the user was trying to access before being redirected
    const from = location.state?.from?.pathname || "/";

    const onSubmit = async () => {
        try {
            // Login logics

            // On successful login, navigate to the intended page or a default.
            navigate(from, { replace: true });

            notify("Successfully login", "success");
        } catch (err) {
            console.log(err);
            // const defaultMessage = "Something went wrong. Please try again.";
            // const apiError = getApiError(err, defaultMessage);

            notify("Something went wrong. Please try again.", "error");
        }
    };

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
                            onClick={onSubmit}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginScreen;
