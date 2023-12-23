import { useContext } from "react";
import { ThemeContext } from "styled-components";
import ThemeModeStyle from "./style";
import Switch from "react-switch";
import { shade } from "polished";
import { ThemeToggleContext } from "../../contexts/ThemeToggleContext";

export function SwitchTheme() {
  const { toggleTheme } = useContext(ThemeToggleContext);
  const { colors, title } = useContext(ThemeContext);

  return (
    <ThemeModeStyle>
      <Switch
        onChange={toggleTheme}
        checked={title === "dark"} // Ajuste conforme necessário
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        handleDiameter={20}
        onHandleColor={ colors.backgroundSecondary}
        offHandleColor={shade(0.1, colors.background)}
        offColor={shade(0.35, colors.primary)}
        onColor={colors.secondary}
      ></Switch>
    </ThemeModeStyle>
  );
}
