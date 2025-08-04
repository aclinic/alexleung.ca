import React from "react";
import { BiSun, BiMoon } from "react-icons/bi";

type ToggleProps = {
  toggleTheme: React.MouseEventHandler<HTMLButtonElement>;
  theme?: string;
};

const Toggle = ({ toggleTheme, theme = "light" }: ToggleProps) => {
  const isDark = theme === "dark";
  
  return (
    <button 
      className="absolute top-2 right-2 bg-transparent border-none text-black dark:text-white flex items-center gap-2 max-w-[140px] z-[100] focus:outline-none"
      onClick={toggleTheme}
    >
      <span className="mx-2 text-lg">
        <BiMoon />
      </span>
      <input type="checkbox" className="h-0 w-0 invisible" checked={isDark} readOnly />
      <div className={`cursor-pointer w-[60px] h-7 rounded-full relative ${isDark ? 'bg-highlight' : 'bg-hover'} 
        after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-6 after:h-6 after:bg-white after:rounded-full 
        after:transition-transform after:duration-300 ${isDark ? 'after:translate-x-8' : ''}`}></div>
      <span className="mx-2 text-lg">
        <BiSun />
      </span>
    </button>
  );
};

export default Toggle;
