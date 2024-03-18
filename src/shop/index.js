import React from "react";
import style from "../styles/shop.module.css";
import GradientContainer from "../skins/GradientContainer";

function Shop(){

    const gradients = [
        { primary: 'rgb(255,0,0)', accent: 'rgb(255,0,0)'},
        { primary: 'rgb(202, 222, 185)', accent: 'rgb(202, 222, 185)' },
        { primary: 'rgb(227, 67, 28)', accent: 'rgb(227, 67, 28)' },
        { primary: 'rgb(223, 252, 23)', accent: 'rgb(223, 252, 23)' },
        { primary: 'rgb(57, 8, 138)', accent: 'rgb(57, 8, 138)' },
        { primary: 'rgb(40, 215, 171)', accent: 'rgb(40, 215, 171)' },
        { primary: 'rgb(150, 232, 236)', accent: 'rgb(150, 232, 236)' },
    ];

    return(
        <div className={`${style.main}`}>
            <div className={`${style.title}`}>
                <h1 className={`${style.h1}`}>Shop</h1>
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
                        <div className={`${style.buy}`}>
                            <h1 className={`${style.price}`}>
                                Price: <span style={{color: gradient.accent}}>400 pt</span>
                            </h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Shop;