import { useState } from "react";
import { useWallets, RecoveryMethod } from "@openfort/react";
import { TextField, Button, Typography, CircularProgress, Stack, Alert, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomCard from "@/components/ui/custom-card.tsx";
import { type CreateWalletFormData, createWalletSchema } from "@/types";
import useNotifier from "@/hooks/use-notifier.ts";

const CreateWallet = () => {
    const notify = useNotifier();
    const { createWallet } = useWallets();
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateWalletFormData>({
        resolver: yupResolver(createWalletSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = async (data: CreateWalletFormData) => {
        setIsCreating(true);
        setError(null);
        try {
            const newWallet = await createWallet({
                recovery: {
                    recoveryMethod: RecoveryMethod.PASSWORD,
                    password: data.password,
                },
            });
            console.log("New Wallet created:", newWallet);
            notify("Wallet created successfully!", "success");
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Failed to create wallet. Please try again.";
            console.error("Error creating wallet:", err);
            setError(errorMessage);
            notify(errorMessage, "error");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <CustomCard>
            <Stack spacing={2}>
                <Typography variant="h6" gutterBottom>
                    Create Your Wallet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This is your secure, non-custodial wallet. Choose a password to secure it.
                </Typography>
                <Grid
                    container
                    spacing={2}
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ width: "100%" }}
                >
                    <Grid size={8}>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />
                        {error && (
                            <Alert severity="error" sx={{ mt: 1, width: "100%" }}>
                                {error}
                            </Alert>
                        )}
                    </Grid>
                    <Grid size={4}>
                        <Button type="submit" variant="contained" disabled={isCreating} sx={{ width: "100%" }}>
                            {isCreating ? <CircularProgress size={24} /> : "Create Wallet"}
                        </Button>
                    </Grid>
                </Grid>
            </Stack>
        </CustomCard>
    );
};

export default CreateWallet;
