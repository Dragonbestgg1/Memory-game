import React from "react";
import style from "../styles/skins.module.css";
import GradientContainer from "./GradientContainer";

const gradients = [
    { primary: 'rgb(137, 141, 221)', secondary: 'rgb(103, 38, 134)', accent: 'rgb(207, 88, 205)' },
    { primary: 'rgb(249, 156, 114)', secondary: 'rgb(30, 153, 7)', accent: 'rgb(20, 245, 108)' },
    { primary: 'rgb(157, 202, 202)', secondary: 'rgb(51, 120, 120)', accent: 'rgb(81, 199, 198)' },
    { primary: 'rgb(161, 207, 168)', secondary: 'rgb(56, 67, 110)', accent: 'rgb(144, 112, 182)' },
    { primary: 'rgb(193, 246, 120)', secondary: 'rgb(11, 64, 151)', accent: 'rgb(125, 40, 240)' },
    { primary: 'rgb(130, 236, 182)', secondary: 'rgb(141, 21, 140)', accent: 'rgb(228, 76, 89)' },
    { primary: 'rgb(111, 159, 255)', secondary: 'rgb(94, 0, 167)', accent: 'rgb(226, 23, 254)' },
    { primary: 'rgb(180, 201, 191)', secondary: 'rgb(93, 67, 70)', accent: 'rgb(158, 161, 123)' },
    { primary: 'rgb(255,0,0)', accent: 'rgb(255,0,0)'},
    { primary: 'rgb(202, 222, 185)', accent: 'rgb(202, 222, 185)' },
    { primary: 'rgb(227, 67, 28)', accent: 'rgb(227, 67, 28)' },
    { primary: 'rgb(223, 252, 23)', accent: 'rgb(223, 252, 23)' },
    { primary: 'rgb(57, 8, 138)', accent: 'rgb(57, 8, 138)' },
    { primary: 'rgb(40, 215, 171)', accent: 'rgb(40, 215, 171)' },
    { primary: 'rgb(150, 232, 236)', accent: 'rgb(150, 232, 236)' },
];

function Skins(){
    return(
        <div className={`${style.main}`}>
            <div className={`${style.title}`}>
                <h1 className={`${style.h1}`}>Skins</h1>
            </div>
            <div className={`${style.skinContainers}`}>
                {gradients.map((gradient, index) => (
                    <div style={{border: `1px solid ${gradient.accent}`}} key={index} className={`${style.container}`}>
                        <GradientContainer className={`${style.background}`} primaryColor={gradient.primary} secondaryColor={gradient.secondary}>
                            {/* gradient display */}    
                        </GradientContainer>
                        <h1 className={`${style.h1}`}>
                            Style <span style={{color: gradient.accent}}>{index + 1}</span>
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Skins;
