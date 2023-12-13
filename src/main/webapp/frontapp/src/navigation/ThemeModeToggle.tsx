import React, {useState} from "react";
import styled from "styled-components";

import useThemeToggleStore from "../stores/useThemeToggleStore";

const ThemeModeToggle = () => {

    const {themeMode, setThemeMode} = useThemeToggleStore();

    const toggleThemeHandler = ():void => {
        if (themeMode === "light") {
            setThemeMode("dark");
            window.localStorage.setItem("theme", "dark");
        } else {
            setThemeMode("light");
            window.localStorage.setItem("theme", "light");
        }
    };

    return (
        <div style={{color: "white"}}>
            <button onClick={() => toggleThemeHandler()}>
                darkMode
            </button>
        </div>
    );
};

export default ThemeModeToggle;