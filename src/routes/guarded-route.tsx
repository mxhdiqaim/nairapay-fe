import { memo, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStatus } from "@openfort/react";
import Spinner from "@/components/ui/spinner.tsx";

type Props = {
    authGuard: boolean;
    children: ReactNode;
};

const GuardedRoute = memo(({ children, authGuard }: Props) => {
    // Get authentication and loading status from the Openfort SDK
    const { isAuthenticated, isLoading } = useStatus();
    const location = useLocation();

    // If the SDK is still loading, show a spinner
    if (!isLoading) return <Spinner />;

    // This handles the main logic for protected routes.
    // If the route requires authentication and the user is NOT authenticated,
    // redirect them to the login page.
    if (authGuard && !isAuthenticated) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    // If no authentication is required (e.g., a public route), or if the user
    // is authenticated and on a protected route, just render the children.
    return <>{children}</>;
});

export default GuardedRoute;
