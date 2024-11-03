import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/colour-theme/globalStyles";
import { lightTheme, darkTheme } from "./components/colour-theme/Themes";
import useDarkMode from "./components/colour-theme/useDarkMode";
import Home from "./components/Home";
import About from "./components/About";
import SocialLinks from "./components/SocialLinks";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Toggle from "./components/colour-theme/Toggler";
import "./index.css";

const App = () => {
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Toggle toggleTheme={themeToggler} />
      <SocialLinks />
      <Home />
      <About />
      <Contact />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
