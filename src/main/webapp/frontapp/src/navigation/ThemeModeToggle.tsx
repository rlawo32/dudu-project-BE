import React from "react";
import styled from "styled-components";

import useThemeToggleStore from "../stores/useThemeToggleStore";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun as sunIcon, faMoon as moonIcon} from "@fortawesome/free-solid-svg-icons";

const DarkModeToggle = styled.div`
  display: inline-block;
  padding: 2px 0 0 0;
  
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
    height: 23px;
    width: 55px;
    border: 2px solid gray;
    border-radius: 60px;
    background-color: white;
    transition: background-color 250ms;
  }

  .toggle-checkbox:checked ~ .toggle-slot {
    background-color: #374151;
  }

  .toggle-button {
    transform: translate(34px, 3px);
    position: absolute;
    height: 17px;
    width: 17px;
    border-radius: 50%;
    background-color: #ffeccf;
    box-shadow: inset 0px 0px 0px 0.75px #ffbb52;
    transition: background-color 250ms, border-color 250ms, transform 500ms cubic-bezier(.26,2,.46,.21);
  }

  .toggle-checkbox:checked ~ .toggle-slot .toggle-button {
    background-color: #485367;
    box-shadow: inset 0px 0px 0px 0.75px white;
    transform: translate(5px, 3px);
  }

  .sun-icon {
    position: absolute;
    height: 17px;
    width: 17px;
    color: #ffbb52;
  }

  .sun-icon-wrapper {
    position: absolute;
    height: 0;
    width: 200px;
    opacity: 1;
    transform: translate(4px, 19px) rotate(10deg);
    transform-origin: 50% 50%;
    transition: opacity 150ms, transform 500ms cubic-bezier(.26,1,.46,.21);
  }

  .toggle-checkbox:checked ~ .toggle-slot .sun-icon-wrapper {
    opacity: 0;
    transform: translate(32px, 19px) rotate(10deg);
  }

  .moon-icon {
    position: absolute;
    height: 17px;
    width: 17px;
    color: white;
    transform: rotate(-25deg);
  }

  .moon-icon-wrapper {
    position: absolute;
    height: 0;
    width: 200px;
    opacity: 0;
    transform: translate(15px, 19px) rotate(10deg);
    transform-origin: 50% 50%;
    transition: opacity 150ms, transform 500ms cubic-bezier(.26,1,.46,.21);
  }

  .toggle-checkbox:checked ~ .toggle-slot .moon-icon-wrapper {
    opacity: 1;
    transform: translate(35px, 19px) rotate(10deg);
  }
`;

const ThemeModeToggle = () => {

    const {themeMode, setThemeMode} = useThemeToggleStore();

    const onChangeToggle = (checked:boolean):void => {
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
                        <FontAwesomeIcon icon={sunIcon} className="iconify sun-icon"></FontAwesomeIcon>
                    </div>
                    <div className='toggle-button'></div>
                    <div className='moon-icon-wrapper'>
                        <FontAwesomeIcon icon={moonIcon} className="iconify moon-icon"></FontAwesomeIcon>
                    </div>
                </div>
            </label>
        </DarkModeToggle>
    );
};

export default ThemeModeToggle;