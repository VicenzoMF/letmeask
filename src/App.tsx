import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "styled-components";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";
import light from "./styles/themes/light";
import dark from "./styles/themes/dark";
import { ThemeToggleContext } from "./contexts/ThemeToggleContext";
import GlobalStyle from "./styles/global";
import usePersistedState from "./hooks/usePersistedState";

function App() {
  const [theme, setTheme] = usePersistedState('theme', light);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  return (
    <ThemeToggleContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme}>
      <GlobalStyle />
        <BrowserRouter>
          <AuthContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms/new" element={<NewRoom />} />
              <Route path="/rooms/:id" element={<Room />} />
              <Route path="/admin/rooms/:id" element={<AdminRoom />} />
            </Routes>
          </AuthContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
}

export default App;
