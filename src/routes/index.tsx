import type { ComponentType, ReactNode } from "react";
import HomeScreen from "../pages/home.tsx";
import AuthScreen from "../pages/auth-screen.tsx";
import NotFoundScreen from "../pages/404.tsx";
import TransactionScreen from "@/pages/transaction-screen.tsx";
import SendCoins from "@/pages/send-coins.tsx";

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
        title: "Dashboard",
        element: HomeScreen,
        icon: "🏠",
    },
    {
        to: "/send",
        title: "Send",
        element: SendCoins,
        icon: "🚀",
    },
    {
        to: "/transactions",
        title: "Transactions",
        element: TransactionScreen,
        icon: "💸",
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
        authGuard: false,
    },
];
