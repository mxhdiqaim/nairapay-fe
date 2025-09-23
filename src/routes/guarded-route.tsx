import { memo, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useOAuth, useStatus } from "@openfort/react";
import Spinner from "@/components/ui/spinner.tsx";
import ServerDown from "@/pages/feedbacks/server-down.tsx";

type Props = {
    authGuard: boolean;
    children: ReactNode;
};

// This is your GuardedRoute component that checks authentication status
const GuardedRoute = memo(({ children, authGuard }: Props) => {
    const { isAuthenticated } = useStatus();
    const { isSuccess: isServerOk, isLoading } = useOAuth();
    const location = useLocation();

    // Show loading spinner if still checking status
    if (isLoading) return <Spinner />;

    // // Show server down page if the server isn't responding
    if (!isServerOk) return <ServerDown />;

    // If the route requires auth and the user is NOT authenticated, redirect to log in
    if (authGuard && !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If the route requires auth and the user is authenticated, show the page
    if (authGuard && isAuthenticated) {
        return <>{children}</>;
    }

    // If no authentication is required, just render the children
    return <>{children}</>;
});

export default GuardedRoute;
