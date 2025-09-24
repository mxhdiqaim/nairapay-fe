import { Provider } from "./context/provider.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { appRoutes, type AppRouteType } from "./routes";
import type { JSX } from "react";
import Layout from "@/components/layout";
import GuardedRoute from "@/routes/guarded-route.tsx";

import "./App.css";

const renderRoutes = (routes: AppRouteType[], parentPath = ""): JSX.Element[] => {
    return routes.flatMap((route, index) => {
        const fullPath = (parentPath ? `${parentPath}/${route.to}` : route.to).replace(/\/+/g, "/");

        const useLayout = route.useLayout ?? true;
        const authGuard = route.authGuard ?? true;

        let element: JSX.Element = <route.element />;

        // First, apply the auth guard if it is required for this route.
        if (authGuard) {
            element = <GuardedRoute authGuard={authGuard}>{element}</GuardedRoute>;
        }

        // Then, wrap the element in a layout if a layout is required.
        if (useLayout) {
            element = <Layout>{element}</Layout>;
        }

        const currentRoute = <Route key={`${fullPath}-${index}`} path={fullPath} element={element} />;

        if (route.children && route.children.length > 0) {
            return [currentRoute, ...renderRoutes(route.children, fullPath)];
        }

        return [currentRoute];
    });
};

function App() {
    return (
        <Provider>
            <Router>
                <Routes>{renderRoutes(appRoutes)}</Routes>
            </Router>
        </Provider>
    );
}

export default App;
