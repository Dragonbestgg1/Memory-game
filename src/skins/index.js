import React from "react";
import style from "../styles/skins.module.css";

function Skins(){
    return(
        <div className={`${style.main}`}>
            <div className={`${style.title}`}>
                <h1 className={`${style.h1}`}>Skins</h1>

            </div>
            <div className={`${style.skinContainers}`}>
                
            </div>
        </div>
    )
}

export default Skins;