import { memo, type ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStatus } from "@openfort/react";
import Spinner from "@/components/skeletons/spinner.tsx";
import { getEnvVariable } from "@/utils";
import ServerDown from "@/pages/feedbacks/server-down.tsx";

type Props = {
    authGuard: boolean;
    children: ReactNode;
};

const backendUrl = getEnvVariable("VITE_BACKEND_URL");

const GuardedRoute = memo(({ children, authGuard }: Props) => {
    const location = useLocation();
    const { isAuthenticated, isLoading: isAuthLoading } = useStatus();
    const [isBackendDown, setIsBackendDown] = useState(false);
    const [isCheckingStatus, setIsCheckingStatus] = useState(authGuard);

    useEffect(() => {
        const checkBackendStatus = async () => {
            if (!authGuard) return; // Don't check for public routes

            try {
                // Assuming the root URL returns a successful response if the server is up
                const response = await fetch(backendUrl);
                if (!response.ok) {
                    setIsBackendDown(true);
                }
            } catch (error) {
                console.error("Backend check failed:", error);
                setIsBackendDown(true);
            } finally {
                setIsCheckingStatus(false);
            }
        };

        checkBackendStatus().then((r) => console.log(r));
    }, [authGuard]);

    if (isAuthLoading || isCheckingStatus) {
        return <Spinner />;
    }

    // For authenticated routes, if the backend is down, show the server down page.
    if (authGuard && isBackendDown) {
        return <ServerDown />;
    }

    // If the route requires auth and the user is not authenticated, redirect to the auth page.
    if (authGuard && !isAuthenticated) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return <>{children}</>;
});

export default GuardedRoute;
