import React, {useEffect, useState} from "react";
import styled from "styled-components";

import useThemeToggleStore from "../stores/useThemeToggleStore";

const DarkModeToggle = styled.div`
  
  label {
    cursor: pointer;
  }
  
  .toggle-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .toggle-slot {
    position: relative;
    height: 50px;
    width: 100px;
    border: 5px solid #e4e7ec;
    border-radius: 60px;
    background-color: white;
    box-shadow: 0px 10px 25px #e4e7ec;
    transition: background-color 250ms;
  }

  .toggle-checkbox:checked ~ .toggle-slot {
    background-color: #374151;
  }

  .toggle-button {
    transform: translate(55px, 5px);
    position: absolute;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #ffeccf;
    box-shadow: inset 0px 0px 0px 0.75px #ffbb52;
    transition: background-color 250ms, border-color 250ms, transform 500ms cubic-bezier(.26,2,.46,.71);
  }

  .toggle-checkbox:checked ~ .toggle-slot .toggle-button {
    background-color: #485367;
    box-shadow: inset 0px 0px 0px 0.75px white;
    transform: translate(5px, 5px);
  }

  .sun-icon {
    position: absolute;
    height: 6px;
    width: 6px;
    color: #ffbb52;
  }

  .sun-icon-wrapper {
    position: absolute;
    height: 12px;
    width: 12px;
    opacity: 1;
    transform: translate(45px, 45px) rotate(15deg);
    transform-origin: 50% 50%;
    transition: opacity 150ms, transform 500ms cubic-bezier(.26,2,.46,.71);
  }

  .toggle-checkbox:checked ~ .toggle-slot .sun-icon-wrapper {
    opacity: 0;
    transform: translate(45px, 45px) rotate(0deg);
  }

  .moon-icon {
    position: absolute;
    height: 12px;
    width: 12px;
    color: white;
  }

  .moon-icon-wrapper {
    position: absolute;
    height: 12px;
    width: 12px;
    opacity: 0;
    transform: translate(45px, 5px) rotate(0deg);
    transform-origin: 50% 50%;
    transition: opacity 150ms, transform 500ms cubic-bezier(.26,2.5,.46,.71);
  }

  .toggle-checkbox:checked ~ .toggle-slot .moon-icon-wrapper {
    opacity: 1;
    transform: translate(45px, 45px) rotate(-15deg);
  }
`;

const ThemeModeToggle = () => {

    const {themeMode, setThemeMode} = useThemeToggleStore();

    const onChangeToggle = (checked:boolean):void => {
        console.log(checked)
        setThemeMode(checked);
        window.localStorage.setItem("theme", `${checked}`);
    }

    return (
        <DarkModeToggle style={{color: "white"}}>
            <label>
                <input className='toggle-checkbox' type='checkbox' checked={themeMode}
                       onChange={({ target: { checked } }) => onChangeToggle(checked)} />
                <div className='toggle-slot'>
                    <div className='sun-icon-wrapper'>
                        <div className="iconify sun-icon" data-icon="feather-sun" data-inline="false"></div>
                    </div>
                    <div className='toggle-button'></div>
                    <div className='moon-icon-wrapper'>
                        <div className="iconify moon-icon" data-icon="feather-moon" data-inline="false"></div>
                    </div>
                </div>
            </label>
        </DarkModeToggle>
    );
};

export default ThemeModeToggle;