import { createTheme, responsiveFontSizes, type ThemeOptions } from "@mui/material/styles";
// import "@mui/x-data-grid/themeAugmentation";
//
// declare module "@mui/x-data-grid" {
//     interface NoRowsOverlayPropsOverrides {
//         period?: string;
//     }
// }

declare module "@mui/material/styles" {
    interface Theme {
        layout: {
            sidebarWidth: number;
            sidebarCollapsedWidth: number;
            sidebarHeight: number;
            appBarHeight: number;
        };
        customShadows: {
            card: string;
            dialog: string;
            button: string;
        };
        borderRadius: {
            small: number;
            medium: number;
            large: number;
        };
    }

    interface ThemeOptions {
        layout?: {
            sidebarWidth?: number;
            sidebarCollapsedWidth?: number;
            sidebarHeight?: number;
            appBarHeight?: number;
        };
        customShadows?: {
            card?: string;
            dialog?: string;
            button?: string;
        };
        borderRadius?: {
            small?: number;
            medium?: number;
            large?: number;
        };
    }

    interface Palette {
        alternate: Palette["primary"];
        customColors: {
            dark: string;
            light: string;
            darkBg: string;
            lightBg: string;
            border: string;
            tableHeader: string;
            divider: string;
        };
    }

    interface PaletteOptions {
        alternate?: PaletteOptions["primary"];
        customColors?: {
            dark?: string;
            light?: string;
            darkBg?: string;
            lightBg?: string;
            border?: string;
            tableHeader?: string;
            divider?: string;
        };
    }
}

const baseThemeOptions: ThemeOptions = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 600, // Mobile
            md: 960, // Tablet
            lg: 1280, // Laptop
            xl: 1920, // Desktop
        },
    },
    typography: {
        fontFamily: "'Space Grotesk', 'Roboto', sans-serif",
        fontSize: 16,
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
        h1: { fontSize: "2.5rem", fontWeight: 600 },
        h2: { fontSize: "2rem", fontWeight: 600 },
        h3: { fontSize: "1.75rem", fontWeight: 600 },
        h4: { fontSize: "1.5rem", fontWeight: 600 },
        h5: { fontSize: "1.25rem", fontWeight: 600 },
        h6: { fontSize: "1rem", fontWeight: 700 },
    },
    palette: {
        primary: {
            main: "#6834D1",
            light: "#865ddf",
            dark: "#4a2493",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#9E9E9E",
            light: "#F5F5F5",
            dark: "#616161",
            contrastText: "#FFFFFF",
        },
        info: {
            main: "#2196F3",
            light: "#64B5F6",
            dark: "#1976D2",
            contrastText: "#FFF",
        },
        error: {
            main: "#F44336",
            light: "#E57373",
            dark: "#D32F2F",
        },
        warning: {
            main: "#FF9800",
            light: "#FFB74D",
            dark: "#F57C00",
        },
        success: {
            main: "#06C270",
            light: "#81C784",
            dark: "#388E3C",
        },
        grey: {
            50: "#E3DBDB",
            100: "#D9D0D0",
            200: "#C9C0C0",
            300: "#9F9F92",
            400: "#8A8A7E",
            500: "#6D6466",
            600: "#5A5254",
            700: "#4E3D42",
            800: "#3A2E31",
            900: "#2A2123",
        },
        text: {
            primary: "#212121",
            secondary: "#757575",
        },
        alternate: {
            main: "#F5F5F5",
            dark: "#545665",
        },
        background: {
            default: "#FFFFFF",
            paper: "#FCFCFC",
        },
        customColors: {
            dark: "#212121",
            light: "#FFFFFF",
            darkBg: "#F5F5F5",
            lightBg: "#FFFFFF",
            border: "#E0E0E0",
            tableHeader: "#FAFAFA",
            divider: "#E0E0E0",
        },
    },
    layout: {
        sidebarWidth: 271,
        sidebarCollapsedWidth: 72,
        sidebarHeight: 100,
        appBarHeight: 72,
    },
    customShadows: {
        card: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        dialog: "0px 0.5px 2px 1px rgba(0, 0, 0, 0.15)",
        button: "0px 1px 2px rgba(0, 0, 0, 0.05)",
    },
    borderRadius: {
        small: 2,
        medium: 4,
        large: 6,
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "10px 16px",
                },
                contained: {
                    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
                    background: "transparent",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 6,
                    },
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: "#F5F5F5",
                    fontWeight: 600,
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 12,
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                // Override the styles for the 'success' variant
                filledSuccess: {
                    backgroundColor: "#4CAF50", // custom success colour
                },
                // Override the styles for the 'error' variant
                filledError: {
                    backgroundColor: "#F44336", // custom error colour
                },
                // You can also customise other variants
                filledWarning: {
                    backgroundColor: "#FF9800",
                },
                filledInfo: {
                    backgroundColor: "#2196F3",
                },
            },
        },
    },
};

export const createAppTheme = (mode: "light" | "dark" = "light") => {
    let theme = createTheme({
        ...baseThemeOptions,
        palette: {
            ...baseThemeOptions.palette,
            mode,
        },
    });

    // Add a custom shadow at index -1
    // @ts-expect-error: TypeScript does not allow negative indices, but this works at runtime
    theme.shadows[-1] = "none";

    theme = responsiveFontSizes(theme);

    return theme;
};
