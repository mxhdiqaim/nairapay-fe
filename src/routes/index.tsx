import type { ComponentType, ReactNode } from "react";
import HomeScreen from "../pages/home.tsx";
import AuthScreen from "../pages/auth-screen.tsx";
import NotFoundScreen from "../pages/404.tsx";

export interface AppRouteType {
    to: string;
    element: ComponentType;
    title?: string;
    icon?: ReactNode;
    useLayout?: boolean;
    authGuard?: boolean;
    hidden?: boolean; // True = Hide from the sidebar, but it accessed through navigation
    children?: AppRouteType[];
}

export const appRoutes: AppRouteType[] = [
    {
        to: "/",
        title: "Home",
        element: HomeScreen,
        hidden: true,
    },

    // Public Routes
    {
        to: "/auth",
        element: AuthScreen,
        useLayout: false,
        authGuard: false,
    },

    // Error Pages
    {
        to: "*",
        title: "notFound",
        element: NotFoundScreen,
        hidden: true,
        useLayout: false,
    },
];
