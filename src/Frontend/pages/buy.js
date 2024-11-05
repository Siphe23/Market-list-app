import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItem } from '../slices/cartSlice'; // Action to add item to the cart

const ShoppingList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // Adjust your API endpoint
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    return (
      (category === 'All' || product.category === category) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddToCart = (product) => {
    dispatch(addItem(product)); // Dispatch action to add product to cart
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Shopping List</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Clothes">Clothes</option>
        <option value="Electronics">Electronics</option>
        <option value="Home Decor">Home Decor</option>
      </select>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <span className="favorite-icon">❤️</span> {/* Heart icon */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingList;
