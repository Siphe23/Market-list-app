// src/App.js
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Frontend/components/Navbar';
import Home from './Frontend/pages/Home'; 
import ShopList from './Frontend/pages/ShopList'; 
import LoginSignup from './Frontend/pages/LoginSignup'; 
import Cart from './Frontend/pages/Cart'; 
import { auth, db } from './Backend/Firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const renderRedirect = async () => {
        if (user) {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userRole = userDoc.data()?.role;

            return userRole === 'seller' ? <Navigate to="/shoplist" /> : <Navigate to="/home" />;
        }
        return <Navigate to="/login" />;
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Router>
            <Navbar />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<LoginSignup />} />
                    <Route path="/shoplist" element={renderRedirect()} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

