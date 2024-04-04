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
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const isGameRoute = location.pathname.includes('game');

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
        if (isGameRoute) {
            navigate('/');
        } else {
            setMenuOpen(!menuOpen);
        }
    };

    const handleLogout = () => {
        // Handle logout
        Cookies.remove('userData');
        setUser(null);
        setShowOptions(false);
    };

    const handleProfileClick = () => {
        if (user) {
            setShowOptions(!showOptions);
        } else {
            setModalIsOpen(true);
        }
    };
    useEffect(() => {
        const selectedStyle = JSON.parse(localStorage.getItem('selectedStyle'));
        if (selectedStyle) {
            const toggleHeaderElements = document.getElementsByClassName('toggleHeader');
            for (let i = 0; i < toggleHeaderElements.length; i++) {
                toggleHeaderElements[i].style.background = `linear-gradient(${selectedStyle.primary}, ${selectedStyle.secondary})`;
                toggleHeaderElements[i].style.backgroundSize = 'cover';
                toggleHeaderElements[i].style.backgroundRepeat = 'no-repeat';
            }
        }
    });

    return (
        <div className={`${style.main}`}>
            <div className={`${style.header}`}>
                <div className={`${style.toggle}`}>
                    <div className={`${style.buttons}`} onClick={toggleMenu}>
                        <FaAlignLeft className={`${style.toggleButton}`} />
                        {isGameRoute ? 'Home' : 'Menu'}
                    </div>
                    {user && (
                        <Link className={`${style.buttons}`} to="/levels">
                            <FaIndent className={`${style.levels}`} />
                            Levels
                        </Link>
                    )}
                </div>
                <div className={`${style.contents}`}>
                    <div className={`${style.profile}`} onClick={handleProfileClick}>
                        {user && user.profile_img ? (
                            <img className={`${style.profileImg}`} src={user.profile_img} alt="User profile" />
                        ) : (
                            <CgProfile className={`${style.profileImg}`} color="white" />
                        )}
                        <div className={`${style.profileName}`}>
                            {user ? user.username : "Login"}
                            <FaAngleDown className={`${style.showSet}`} />
                        </div>
                    </div>
                    {showOptions && (
                        <div className={`${style.options}`}>
                            <Link className={`${style.profileBut}`} to="/settings">Settings</Link>
                            <button className={`${style.profileBut}`} onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
                {menuOpen && (
                    <div className={`${style.toggleHeader} ${menuOpen ? style.open : ''}`}>
                        <Link className={`${style.route}`} to="/">Home</Link>
                        <Link className={`${style.route}`} to="/skins">Skins</Link>
                        {/* <Link className={`${style.route}`} to="/shop">Shop</Link> */}
                        <Link className={`${style.route}`} to="/leaderboard">Leaderboard</Link>
                        {/* <Link className={`${style.route}`} to="/achievements">Achievements</Link> */}
                    </div>
                )}
                <ReactModal className={`${style.modal}`} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                    <Login closeModal={setModalIsOpen} onLoginSuccess={onLoginSuccess} />
                </ReactModal>
            </div>
        </div>
    );
}
export default Header;
