import React from "react";
import style from "../styles/skins.module.css";

function GradientContainer({ primaryColor, secondaryColor, children }) {
    const backgroundStyle = secondaryColor 
        ? { background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }
        : { background: primaryColor };

    return (
        <div style={backgroundStyle} className={`${style.background}`}>
            {children}
        </div>
    );
}

export default GradientContainer;
