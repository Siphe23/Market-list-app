// src/App.js
import React, { useEffect, useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Navbar from './Frontend/components/Navbar'; 
import Home from './Frontend/pages/Home'; 
import ShopList from './Frontend/pages/ShopList';

import LoginSignup from './Frontend/pages/LoginSignup'; 
import Cart from './Frontend/pages/Cart'; 
import Buy from './Frontend/pages/buy'; 
import Sell from './Frontend/pages/Sell'; 

import { auth } from './Backend/Firebase/firebaseConfig'; 

const App = () => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser); 
            setLoading(false); 
        });

        return () => unsubscribe(); 
    }, []);

    if (loading) return <div>Loading...</div>; // Consider replacing with a spinner

    return (
        <Router>
            <Navbar />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<LoginSignup />} />
                    <Route 
                        path="/shoplist" 
                        element={user ? <ShopList /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/cart" 
                        element={user ? <Cart /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/buy" 
                        element={user ? <Buy /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/sell" 
                        element={user ? <Sell /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="*" 
                        element={<Navigate to={user ? '/home' : '/login'} />} 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App; 
