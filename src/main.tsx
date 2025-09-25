import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./theme";

import { SnackbarProvider } from "notistack";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <SnackbarProvider
                maxSnack={3}
                autoHideDuration={3000}
                variant="default"
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <App />
            </SnackbarProvider>
        </ThemeProvider>
    </StrictMode>,
);
