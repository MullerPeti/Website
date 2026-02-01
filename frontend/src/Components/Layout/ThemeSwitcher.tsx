import React, { useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import themeSwitchLogo from '../Images/themeswitchlogo.svg';

const ThemeSwitcher: React.FC = () => {
    const { isDark, toggleTheme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-2 rounded-lg" style={{backgroundColor: isHovered? 'var(--color-button-secondary-hover)' : 'var(--color-button-secondary)', border: '1px solid var(--color-border)'}}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <img src={themeSwitchLogo} alt="Theme switcher" className="w-5 h-5" />
    </button>
  );
};

export default ThemeSwitcher;
