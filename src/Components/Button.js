import React from "react";
import "./Button.css";

const styles = ["btns--primary", "btns--outline"];
const sizes = ["btns--medium", "btns--large", "btns--mobile", "btns--wide"];

const color = ["primary", "blue", "red", "green"];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  buttonColor,
})=>{
    const checkButtonStyle = styles.includes(buttonStyle)?
    buttonStyle : styles[0]

    const checkButtonSize = sizes.includes(buttonSize)?
    buttonSize : sizes[0]

    const checkButtonColor = color.includes(buttonColor)?
    buttonColor : null

    return(
        <button className={`btns ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor}`} 
        onClick={onClick} type={type}>{children}</button>
    )
}
