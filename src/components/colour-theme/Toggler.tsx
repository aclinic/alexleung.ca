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
      className="absolute top-[1%] right-[1%] bg-transparent border-none text-black dark:text-white flex items-center justify-around max-w-[140px] z-[100] focus:outline-none"
      onClick={toggleTheme}
    >
      <span className="mx-2 text-lg">
        <BiMoon />
      </span>
      <input type="checkbox" className="h-0 w-0 invisible" checked={isDark} readOnly />
      <div className={`cursor-pointer w-[60px] h-[28px] ${isDark ? 'bg-highlight' : 'bg-hover'} block rounded-full relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-[24px] after:h-[24px] after:bg-white after:rounded-full after:transition-all after:duration-300 ${isDark ? 'after:translate-x-[30px]' : ''}`}></div>
      <span className="mx-2 text-lg">
        <BiSun />
      </span>
    </button>
  );
};

export default Toggle;
