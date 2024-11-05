// src/Frontend/pages/LoginSignup.js
import React, { useState } from 'react';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const LoginSignup = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('buyer'); // default role
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isSignup) {
                // Sign up logic
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Save user role in Firestore
                await setDoc(doc(db, 'users', user.uid), {
                    email,
                    role,
                });
            } else {
                // Login logic
                await signInWithEmailAndPassword(auth, email, password);
            }

            // Reset form after successful submission
            setEmail('');
            setPassword('');
            setRole('buyer'); // Reset role to default
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>{isSignup ? 'Signup' : 'Login'}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {isSignup && (
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="buyer"
                                checked={role === 'buyer'}
                                onChange={(e) => setRole(e.target.value)}
                            /> Buyer
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="seller"
                                checked={role === 'seller'}
                                onChange={(e) => setRole(e.target.value)}
                            /> Seller
                        </label>
                    </div>
                )}
                <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
                <p>{error}</p>
            </form>
            <button onClick={() => setIsSignup(!isSignup)}>
                Switch to {isSignup ? 'Login' : 'Signup'}
            </button>
        </div>
    );
};

export default LoginSignup;
