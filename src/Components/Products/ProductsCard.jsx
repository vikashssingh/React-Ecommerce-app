// ProductCard.js
import React from 'react';
import './ProductCard.css';
import { useCart } from '../../Contexts/CartContext';
import { useAuth } from '../../Contexts/AuthContext'; // Import your AuthContext
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { currentUser } = useAuth(); // Assuming you have currentUser information in your AuthContext
  const navigate = useNavigate();
  const handleAddToCart = () => {
    if (currentUser) {
      addToCart(product.id);
    } else {
      navigate('signin');
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <span className="product-price">${product.price}</span>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}
