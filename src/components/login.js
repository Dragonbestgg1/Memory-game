import React, { useState } from "react";
import style from "../styles/login.module.css";

function Login() {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div className={`${style.main}`}>
            <h1 className={`${style.h1}`}>{isRegister ? "Register" : "Login"}</h1>
            <form className={`${style.form}`}>
                <div className={`${style.inputAlign}`}>
                    <input type="text" className={`${style.input}`} placeholder="Username or email"></input>
                    <input type="password" className={`${style.input}`} placeholder="Password"></input>
                    {!isRegister && <h1 className={`${style.forgot}`}>Forgot Password?</h1>}
                    {isRegister && <input type="password" className={`${style.input}`} placeholder="Confirm Password"></input>}
                </div>
                <button type="submit" className={`${style.submitBut}`}>{isRegister ? "Register" : "Login"}</button>
                <div className={`${style.signUpBox}`}>
                    {!isRegister ? "Don't have an account?" : "Already have an account?"}
                    <button type="button" className={`${style.signUpButton}`} onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? "Login" : "Register"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
