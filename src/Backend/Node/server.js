// server.js
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Middleware
app.use(cors());
app.use(express.json());

// Get Products
app.get('/api/products', async (req, res) => {
    try {
        const productsSnapshot = await db.collection('products').get();
        const products = productsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Add Product
app.post('/api/products', async (req, res) => {
    try {
        const { name, description, price, imageUrl } = req.body;
        const newProductRef = await db.collection('products').add({
            name,
            description,
            price,
            imageUrl,
        });
        res.status(201).json({ id: newProductRef.id });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
