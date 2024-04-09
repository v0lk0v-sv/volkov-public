import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({});

createRoot(document.getElementById("root")).render(
  <MantineProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MantineProvider>
);
