import type { ComponentType, ReactNode } from "react";
import HomeScreen from "../pages/home.tsx";
import LoginScreen from "../pages/login-screen.tsx";
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
        to: "/login",
        element: LoginScreen,
        useLayout: false,
        authGuard: false,
    },
    // {
    //     to: "/register",
    //     element: RegisterScreen,
    //     useLayout: false,
    //     authGuard: false,
    //     roles: [UserRoleEnum.GUEST],
    // },
    // {
    //     to: "/forget-password",
    //     element: ForgetPasswordScreen,
    //     useLayout: false,
    //     authGuard: false,
    //     roles: [UserRoleEnum.GUEST],
    // },

    // Error Pages
    {
        to: "*",
        title: "notFound",
        element: NotFoundScreen,
        hidden: true,
        useLayout: false,
    },
];
