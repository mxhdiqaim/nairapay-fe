import { Provider } from "./context/provider.tsx";
import MainComponent from "./component/main-component.tsx";
// import { OpenfortButton } from "@openfort/react";

import "./App.css";
import type { AppRouteType } from "./routes";
import type { JSX } from "react";

// Recursive function to render routes and their nested children
const renderRoutes = (routes: AppRouteType[], parentPath = ""): JSX.Element[] => {
    return routes.flatMap((route, index) => {
        // Combine the parent path and current route path, ensuring no double slashes
        const fullPath = (parentPath ? `${parentPath}/${route.to}` : route.to).replace(/\/+/g, "/");

        // Set defaults for layout and auth guard
        const useLayout = route.useLayout ?? true;
        const authGuard = route.authGuard ?? true;

        // Prepare the element with layout and guards if needed
        let element: JSX.Element = <route.element />;

        // Wrap with Layout if useLayout is true
        if (useLayout) {
            element = <Layout>{element}</Layout>;
        }

        // Wrap with GuardedRoute if authGuard is true
        if (authGuard) {
            element = <GuardedRoute authGuard={authGuard}>{element}</GuardedRoute>;
        }

        const currentRoute = <Route key={`${fullPath}-${index}`} path={fullPath} element={element} />;

        // If the route has children, recursively render them
        if (route.children && route.children.length > 0) {
            return [currentRoute, ...renderRoutes(route.children, fullPath)];
        }

        return [currentRoute];
    });
};

function App() {
    return (
        <Provider>
            <MainComponent />
        </Provider>
    );
}

export default App;
