import React from 'react';
import logo from '../../images/Logo.svg'
import './Header.css';
const Header = () => {
    return (
        <div>
           <nav className='header'>
                <img src={logo} alt="" />
                <div>
                    <a href="/home">Home</a>
                    <a href="/order">Order</a>
                    <a href="/review">Review</a>
                    <a href="/manage">Manage</a>
                </div>
            </nav> 
        </div>
    );
};

export default Header;