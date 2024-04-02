import React, { useState } from "react";
import axios from "axios";
import style from "../styles/login.module.css";
import Cookies from 'js-cookie';

function Login({ closeModal, onLoginSuccess }) {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const registerUrl = "/users";
        const loginUrl = "/login";
        const registerData = { username, password, email };
        const loginData = { login: email, password };

        try {
            let userData;
            if (isRegister) {
                // Register the user
                const registerResponse = await axios.post(registerUrl, registerData);
                console.log(registerResponse.data);

                // Log the user in
                const loginResponse = await axios.post(loginUrl, loginData);
                console.log(loginResponse.data);
                userData = loginResponse.data;
            } else {
                // Log the user in
                const response = await axios.post(loginUrl, loginData);
                console.log(response.data);
                userData = response.data;
            }

            // Store received data in a cookie
            Cookies.set('userData', JSON.stringify(userData));

            // Call the onLoginSuccess function with the user data
            onLoginSuccess(userData);
        } catch (error) {
            console.error(error);
        }

        // Close the modal
        closeModal(false);
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
