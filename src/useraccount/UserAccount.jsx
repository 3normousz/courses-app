import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserAccount.css'
import UserIcon from "../assets/user-circle.svg";

function UserAccount({ setIsAuthenticated }) {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('userToken');
        setIsAuthenticated(false);
    };

    const handleLogout = () => {
        logout();

        navigate('/login', { replace: true });
    };

    return (
        <>
            <div id="user-min">
                <img src={UserIcon} alt="" />
                <span>Username</span>
                <ul>
                    <li>Settings</li>
                    <li onClick={handleLogout}>Sign Out</li>
                </ul>
            </div>
        </>
    );
}

export default UserAccount;