import { useEffect } from 'react';
import { useThemeContext } from 'hooks/useThemeContext';

export default function ThemeSwitcher() {
  const { darkMode, setDarkMode } = useThemeContext();

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-bs-theme", "light");
    }
  }, [darkMode]);

  return (
    <div id="theme-switch">
      <button onClick={toggleDarkMode}  className="btn btn-outline-info switch-icon">{!darkMode ? '🌙' : '☀️'}</button>
      <label></label>
    </div>
  );
}
