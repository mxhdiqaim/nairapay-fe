import { type FC, type ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createAppTheme } from "./theme";

interface Props {
    children: ReactNode;
}

export const ThemeProvider: FC<Props> = ({ children }) => {
    const theme = createAppTheme("light");

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};
