import React from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "theme-ui";
import Navbar from "./components/Navbar/Navbar";
import RouterPath from "./config/routes";
import { theme } from "./config/theme_ui";
import Home from "./pages/Home/Home";
import "animate.css";
import Download from "./pages/Download/Download";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <main>
        <Navbar />
        <Routes>
          <Route path={RouterPath.home} element={<Home />} />
          <Route path={RouterPath.download} element={<Download />} />
        </Routes>
      </main>
    </ThemeProvider>
  );
}

export default App;
