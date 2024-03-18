import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserAccount.css'
import UserIcon from "../assets/user-circle.svg";
import LogoutIcon from '@mui/icons-material/Logout';

function UserAccount({ setIsAuthenticated, setCourses, name }) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('userToken');
        setCourses([]);
        setIsAuthenticated(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <div className='user-account text-black'>
            <img src={UserIcon} alt="user icon" className="user-icon" />
            <h2 className="username-text">{name}</h2>
            <div className='sign-out-button'>
                <button onClick={handleLogout}>
                    <LogoutIcon />
                </button>
            </div>
        </div>
    );
}

export default UserAccount;
