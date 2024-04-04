import React, { useState } from "react";
import axios from "axios";
import style from "../styles/login.module.css";
import Cookies from 'js-cookie';

function Login({ closeModal, onLoginSuccess }) {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Add this line
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if all fields are filled
        if (isRegister && (!username || !email || !password || !confirmPassword)) {
            setErrorMessage("All fields must be filled.");
            return;
        } else if (!isRegister && (!email || !password)) {
            setErrorMessage("Email and password must be filled.");
            return;
        } else {
            setErrorMessage("");
        }
    
        // Check if email is valid
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (isRegister && !emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email.");
            return;
        }
    
        // Check if passwords match
        if (isRegister && password !== confirmPassword) {
            setErrorMessage("Passwords must match.");
            return;
        }
    
        const registerUrl = "/users";
        const loginUrl = "/login";
        const registerData = { username, password, email };
        const loginData = { login: email, password };
    
        try {
            let userData;
            if (isRegister) {
                const registerResponse = await axios.post(registerUrl, registerData);
                console.log(registerResponse.data);
        
                const loginResponse = await axios.post(loginUrl, loginData);
                console.log(loginResponse.data);
                userData = loginResponse.data;
            } else {
                const response = await axios.post(loginUrl, loginData);
                console.log(response.data);
                userData = response.data;
            }
        
            Cookies.set('userData', JSON.stringify(userData));
            onLoginSuccess(userData);
            closeModal(false); // Close the modal only when login is successful
        } catch (error) {
            console.error(error);
            setErrorMessage("Failed to log in. Please check your password.");
            // Don't close the modal here
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
                    {isRegister && <input type="password" className={`${style.input}`} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>} {/* Modify this line */}
                </div>
                <button type="submit" className={`${style.submitBut}`}>{isRegister ? "Register" : "Login"}</button>
                {errorMessage && <p className={`${style.err}`}>{errorMessage}</p>}
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
