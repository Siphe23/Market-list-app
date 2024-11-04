// src/Frontend/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa'; // Import user and cart icons
import '../assets/Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <h1>Shoppree<span>.com</span></h1>
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shoplist">Shop List</Link></li>
                <li><Link to="/buy">Buy</Link></li>
                <li><Link to="/sell">Sell</Link></li>
                <li>
                    <Link to="/login">
                        <FaUser /> 
                     
                    </Link>
                </li>
                <li>
                    <Link to="/cart">
                        <FaShoppingCart /> 
                       
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
