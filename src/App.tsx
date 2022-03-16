import React from "react";
import { Button, ThemeProvider } from "theme-ui";
import { theme } from "./config/theme_ui";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button mr={2}>Beep</Button>
        <h1 className="text-3xl font-bold underline text-primary">
          Hello world!
        </h1>
      </div>
    </ThemeProvider>
  );
}

export default App;
