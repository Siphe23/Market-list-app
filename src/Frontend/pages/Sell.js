// src/pages/SellersForm.js
import React, { useState, useEffect } from 'react';
import uploadImage from '../api/uploadImage'; // Correctly importing the default export
import axios from 'axios';

const SellersForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Clothes');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]); // State for product list

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products.');
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Upload image to Firebase and get the URL
      const imageUrl = await uploadImage(image);
      console.log('Image uploaded successfully:', imageUrl); // Log the image URL

      // Create product object
      const product = { name, description, price: parseFloat(price), category, imageUrl };
      console.log('Product object:', product); // Log the product object

      // Post the product to your Node.js backend
      await axios.post('http://localhost:5000/api/products', product);

      // Reset form fields
      setName('');
      setDescription('');
      setPrice('');
      setCategory('Clothes');
      setImage(null);
      alert('Product added successfully!'); // Feedback for the user

      // Fetch updated product list
      fetchProducts();
    } catch (err) {
      console.error('Error adding product:', err); // Log the error
      setError('Error adding product: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="Clothes">Clothes</option>
          <option value="Electronics">Electronics</option>
          <option value="Home Decor">Home Decor</option>
        </select>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>

      {/* Product List Section */}
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price.toFixed(2)}</p>
              <p>Category: {product.category}</p>
              {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={{ width: '100px' }} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SellersForm;
