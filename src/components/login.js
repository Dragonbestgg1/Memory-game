import React from "react";
import style from "../styles/login.module.css";

function Login(){
    return(
        <div className={`${style.main}`}>
            <h1 className={`${style.h1}`}>Login</h1>
            <form className={`${style.form}`}>
                <div className={`${style.inputAlign}`}>
                    <input type="text" className={`${style.input}`} placeholder="Username or email"></input>
                    <input type="text" className={`${style.input}`} placeholder="Password"></input>
                    <h1 className={`${style.forgot}`}>Forgot Password?</h1>
                </div>
                <button type="submit" className={`${style.submitBut}`}>Login</button>
            </form>
        </div>
    )
}

export default Login;