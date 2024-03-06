import React, { useState } from "react";
import style from "../styles/header.module.css";
import { Link } from "react-router-dom";
import { FaAlignLeft } from "react-icons/fa";
import { FaIndent } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import Login from "./login";
import ReactModal from "react-modal";

function Header(){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return(
        <div className={`${style.main}`}>
            <div className={`${style.header}`}>
                <div className={`${style.toggle}`} onClick={toggleMenu}>
                    <div className={`${style.buttons}`}>
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
                        <img className={`${style.profileImg}`} src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png"></img>
                        <div className={`${style.profileName}`} onClick={openModal}>
                            Nabadziba
                            <FaAngleDown className={`${style.showSet}`} />
                        </div>
                    </div>
                </div>
            </div>
            {menuOpen && (
                <div className={`${style.toggleHeader}`}>
                    <Link className={`${style.route}`} to="/">Home</Link>
                    <Link className={`${style.route}`} to="/skins">Skins</Link>
                    <Link className={`${style.route}`} to="/shop">Shop</Link>
                    <Link className={`${style.route}`} to="/leaderboard">LeaderBoard</Link>
                </div>
            )}
            <ReactModal className={`${style.modal}`} isOpen={modalIsOpen} onRequestClose={closeModal}>
                <Login />
            </ReactModal>
        </div>
    )
}

export default Header;
