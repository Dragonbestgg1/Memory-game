import React, { useState } from 'react';
import axios from 'axios';
import style from '../styles/settings.module.css';
import Cookies from 'js-cookie';

function Settings() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState(""); // New state variable for the message

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = JSON.parse(Cookies.get('userData')); // Parse the userData cookie
        const userId = userData.id; // Get user ID from cookie

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('image', image);

        try {
            const response = await axios.put('/users/' + userId, formData);
            console.log(response.data);
            setMessage("Updated successfully");

            // Request new cookie from server
            const userResponse = await axios.get('/users/' + userId);
            Cookies.set('userData', JSON.stringify(userResponse.data));
        } catch (error) {
            console.error(error);
            setMessage("Update failed");
        }
    }

    return (
        <div className={`${style.main}`}>
            <form className={`${style.usernameContainer}`} onSubmit={handleSubmit}>
                <input type="text" className={`${style.input}`} value={username} onChange={handleUsernameChange} placeholder="Username" />
                <input type="password" className={`${style.input}`} value={password} onChange={handlePasswordChange} placeholder="Password" />
                <input type="file" className={`${style.img}`} onChange={handleImageChange} />
                <button type="submit" className={`${style.submit}`}>Submit</button>
            </form>
            <p className={`${style.message}`}>{message}</p>
        </div>
    )
}

export default Settings;
