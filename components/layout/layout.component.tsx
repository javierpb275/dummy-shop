import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MyProvider from "@components/provider/my-provider.component";
import { useCookies } from "react-cookie";
import { useMediaQuery } from "@mui/material";
import MainNavbar from "@components/main-navbar/main-navbar.component";

type LayoutProps = {
  children?: React.ReactNode;
};

const lightTheme = createTheme({
  palette: {
    mode: "light",
    secondary: {
      main: "#040F0F",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#227171",
    },
  },
});

const getActiveTheme = (themeMode: "light" | "dark") => {
  return themeMode === "light" ? lightTheme : darkTheme;
};

const PREFERENCE_COOKIE_NAME = "theme-preference-nextjs-ts-1";

const Layout = ({ children }: LayoutProps) => {
  const useSystemThemePreferenceDark = useMediaQuery(
    "(prefers-color-scheme: dark)"
  );
  const [activeTheme, setActiveTheme] = useState(lightTheme);
  const [cookieTheme, setCookieTheme] = useCookies([PREFERENCE_COOKIE_NAME]);

  const defaultInitialTheme = useSystemThemePreferenceDark ? "dark" : "light";

  const preferredTheme =
    cookieTheme && cookieTheme[PREFERENCE_COOKIE_NAME]
      ? cookieTheme[PREFERENCE_COOKIE_NAME]
      : defaultInitialTheme;

  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">(
    preferredTheme
  );

  const toggleTheme = () => {
    const desiredTheme = selectedTheme === "light" ? "dark" : "light";
    setSelectedTheme(desiredTheme);
    setCookieTheme(PREFERENCE_COOKIE_NAME, desiredTheme);
  };

  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme));
  }, [selectedTheme]);

  return (
    <MyProvider>
      <ThemeProvider theme={activeTheme}>
        <CssBaseline />
        <MainNavbar toggleTheme={toggleTheme}>
          <main>{children}</main>
        </MainNavbar>
      </ThemeProvider>
    </MyProvider>
  );
};

export default Layout;
