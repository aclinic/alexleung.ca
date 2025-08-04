import { useEffect, useState } from "react";

const useDarkMode = (): [string, () => void] => {
  // Initialize with 'light' as default for SSR
  const [theme, setTheme] = useState("light");

  const setMode = (mode: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", mode);
    }
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      // Check for saved theme in localStorage
      const localTheme = window.localStorage.getItem("theme");

      if (localTheme) {
        setTheme(localTheme);
      } else {
        // Check system preference if no saved theme
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const preference = prefersDark ? "dark" : "light";
        setTheme(preference);
      }
    }
  }, []);

  return [theme, themeToggler];
};

export default useDarkMode;
