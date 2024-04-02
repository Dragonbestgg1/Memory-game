import React, { useState, useEffect } from "react";
import style from "../styles/header.module.css";
import { Link } from "react-router-dom";
import { FaAlignLeft } from "react-icons/fa";
import { FaIndent } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import Login from "./login";
import ReactModal from "react-modal";
import Cookies from 'js-cookie';
import { CgProfile } from "react-icons/cg";

function Header() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const handleLogout = () => {
        // Handle logout
        Cookies.remove('userData');
        setUser(null);
        setShowOptions(false);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const [user, setUser] = useState(null);

    // Load the user data from the cookie when the component mounts
    useEffect(() => {
        const userData = Cookies.get('userData');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const onLoginSuccess = (userData) => {
        setUser(userData);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className={`${style.main}`}>
            <div className={`${style.header}`}>
                <div className={`${style.toggle}`}>
                    <div className={`${style.buttons}`} onClick={toggleMenu}>
                        <FaAlignLeft className={`${style.toggleButton}`} />
                        Menu
                    </div>
                    <Link className={`${style.buttons}`} to="/levels">
                        <FaIndent className={`${style.levels}`} />
                        Levels
                    </Link>
                </div>
                <div className={`${style.contents}`}>
                    <div className={`${style.profile}`}>
                        {user && user.profile_img ? (
                            <img className={`${style.profileImg}`} src={user.profile_img} alt="User profile" />
                        ) : (
                            <CgProfile className={`${style.profileImg}`} color="white" />
                        )}
                        <div className={`${style.profileName}`} onClick={openModal}>
                            {user ? user.username : "Login"}
                            <FaAngleDown className={`${style.showSet}`} />
                        </div>
                    </div>
                    {showOptions && (
                        <div className={`${style.options}`} style={{ position: 'absolute' }}>
                            <Link className={`${style.buttons}`} to="/settings" />
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
                {menuOpen && (
                    <div className={`${style.toggleHeader} ${menuOpen ? style.open : ''}`}>
                        <Link className={`${style.route}`} to="/">Home</Link>
                        <Link className={`${style.route}`} to="/skins">Skins</Link>
                        <Link className={`${style.route}`} to="/shop">Shop</Link>
                        <Link className={`${style.route}`} to="/leaderboard">Leaderboard</Link>
                        <Link className={`${style.route}`} to="/achievements">Achievements</Link>
                    </div>
                )}
                <ReactModal className={`${style.modal}`} isOpen={modalIsOpen} onRequestClose={closeModal}>
                    <Login closeModal={setModalIsOpen} onLoginSuccess={onLoginSuccess} />
                </ReactModal>
            </div>
        </div>
    )
}

export default Header;
