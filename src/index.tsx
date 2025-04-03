import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

// material ui theme declaration - provided couple of examples in the code
// regarding usage
const theme = createTheme({
  palette: {
    background: {
      default: "#f4f4f4",
    },
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#388e3c",
    },
    warning: {
      main: "#fbc02d",
    },
    error: {
      main: "#d32f2f",
    },
    success: {
      main: "#ffa000",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
