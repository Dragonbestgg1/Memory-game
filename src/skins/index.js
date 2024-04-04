import React, { useEffect, useState } from "react";
import style from "../styles/skins.module.css";
import GradientContainer from "./GradientContainer";
import Cookies from 'js-cookie';

const gradients = [
    { primary: 'rgb(137, 141, 221)', secondary: 'rgb(103, 38, 134)',    accent: 'rgb(207, 88, 205)' },
    { primary: 'rgb(249, 156, 114)', secondary: 'rgb(30, 153, 7)',      accent: 'rgb(20, 245, 108)' },
    { primary: 'rgb(157, 202, 202)', secondary: 'rgb(51, 120, 120)',    accent: 'rgb(81, 199, 198)' },
    { primary: 'rgb(161, 207, 168)', secondary: 'rgb(56, 67, 110)',     accent: 'rgb(144, 112, 182)' },
    { primary: 'rgb(193, 246, 120)', secondary: 'rgb(11, 64, 151)',     accent: 'rgb(125, 40, 240)' },
    { primary: 'rgb(130, 236, 182)', secondary: 'rgb(141, 21, 140)',    accent: 'rgb(228, 76, 89)' },
    { primary: 'rgb(111, 159, 255)', secondary: 'rgb(94, 0, 167)',      accent: 'rgb(226, 23, 254)' },
    { primary: 'rgb(180, 201, 191)', secondary: 'rgb(93, 67, 70)',      accent: 'rgb(158, 161, 123)' },
    { primary: 'rgb(255, 0, 0)',     secondary: 'rgb(255,0,0)',         accent: 'rgb(255,0,0)'},
    { primary: 'rgb(202, 222, 185)', secondary: 'rgb(202, 222, 185)',   accent: 'rgb(202, 222, 185)' },
    { primary: 'rgb(227, 67, 28)',   secondary: 'rgb(227, 67, 28)',     accent: 'rgb(227, 67, 28)' },
    { primary: 'rgb(223, 252, 23)',  secondary: 'rgb(223, 252, 23)',    accent: 'rgb(223, 252, 23)' },
    { primary: 'rgb(57, 8, 138)',    secondary: 'rgb(57, 8, 138)',      accent: 'rgb(57, 8, 138)' },
    { primary: 'rgb(40, 215, 171)',  secondary: 'rgb(40, 215, 171)',    accent: 'rgb(40, 215, 171)' },
    { primary: 'rgb(150, 232, 236)', secondary: 'rgb(150, 232, 236)',   accent: 'rgb(150, 232, 236)' },
];

function Skins(){

    const [unlockedStyles, setUnlockedStyles] = useState([]);
    const selectedStyleCookie = Cookies.get('selectedStyle');
    const [selectedStyle, setSelectedStyle] = useState(selectedStyleCookie ? JSON.parse(selectedStyleCookie) : null);



    useEffect(() => {
        const userData = Cookies.get('userData');
        if (userData) {
            const parsedData = JSON.parse(userData);
            const unlockedStylesArray = JSON.parse(parsedData.unlocked_styles);
            setUnlockedStyles(unlockedStylesArray);
        }
    }, []);

    useEffect(() => {
        const toggleHeaderElements = document.getElementsByClassName('toggleHeader');
        if (selectedStyle) {
            document.body.style.background = `linear-gradient(${selectedStyle.primary}, ${selectedStyle.secondary})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.height = '100vh';
            for (let i = 0; i < toggleHeaderElements.length; i++) {
                toggleHeaderElements[i].style.background = `linear-gradient(${selectedStyle.primary}, ${selectedStyle.secondary})`;
                toggleHeaderElements[i].style.backgroundSize = 'cover';
                toggleHeaderElements[i].style.backgroundRepeat = 'no-repeat';
            }
        } else {
            document.body.style.background = '';
            for (let i = 0; i < toggleHeaderElements.length; i++) {
                toggleHeaderElements[i].style.background = '';
            }
        }
    }, [selectedStyle]);
    

    const handleStyleClick = (index, gradient) => {
        const userData = Cookies.get('userData');
        if (userData && unlockedStyles[index] !== 0) {
            setSelectedStyle(gradient);
            Cookies.set('selectedStyle', JSON.stringify(gradient), { expires: 7 }); // The cookie will expire after 7 days
        }
    };
    
    const handleResetClick = () => {
        setSelectedStyle(null);
        Cookies.remove('selectedStyle');
    };
    

    return(
        <div className={`${style.main}`}>
            <div className={`${style.title}`}>
                <h1 className={`${style.h1}`}>Skins</h1>
                <button className={`${style.reset}`} onClick={handleResetClick}>Reset to Default</button>
            </div>
            <div className={`${style.skinContainers}`}>
                {gradients.map((gradient, index) => (
                    <div 
                        style={{
                            border: `1px solid ${gradient.accent}`,
                            opacity: unlockedStyles[index] === 1 ? 1 : 0.5,
                            cursor: unlockedStyles[index] === 1 ? 'pointer' : 'default'
                        }} 
                        key={index} 
                        className={`${style.container}`}
                        onClick={() => handleStyleClick(index, gradient)}
                    >
                        <GradientContainer className={`${style.background}`} primaryColor={gradient.primary} secondaryColor={gradient.secondary}>
                             
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