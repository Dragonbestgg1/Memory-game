import React, { useState } from "react";
import axios from "axios";
import style from "../styles/login.module.css";

function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/users", {
                username,
                password,
                email
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={`${style.main}`}>
            <h1 className={`${style.h1}`}>{isRegister ? "Register" : "Login"}</h1>
            <form className={`${style.form}`} onSubmit={handleSubmit}>
                <div className={`${style.inputAlign}`}>
                    {isRegister && <input type="text" className={`${style.input}`} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>}
                    <input type="text" className={`${style.input}`} placeholder={isRegister ? "Email" : "Username or email"} value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input type="password" className={`${style.input}`} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
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
