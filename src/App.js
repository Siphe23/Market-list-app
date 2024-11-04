import React from 'react';
import { Provider } from 'react-redux'; // Comment this out if you are not using redux yet
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Frontend/components/Navbar';
import Home from './Frontend/pages/Home'; // Check that Home is correctly exported
import ShopList from './Frontend/pages/ShopList'; // Ensure correct import
import LoginSignup from './Frontend/pages/LoginSignup'; // Ensure correct import
import Cart from './Frontend/pages/Cart'; // Ensure correct import
import '../src/Frontend/assets/Home.css'; 

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} /> {/* Optional: For matching '/home' */}
                    <Route path="/shoplist" element={<ShopList />} />
                    <Route path="/login" element={<LoginSignup />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
