// Importing necessary dependencies and styles
import React, { useEffect } from 'react';
import { useCart } from '../../Contexts/CartContext';
import './CartPage.css';

// CartPage component to display and manage the shopping cart
export default function CartPage() {
  // Accessing cart-related functions and data from the shopping cart context
  const { cart, fetchCart, removeFromCart, updateQuantity, handlePurchase } = useCart();

  // Fetching the cart data when the component mounts
  useEffect(() => {
    fetchCart();
  });

  // Calculating the total price of items in the cart
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handling the purchase process
  const handlePurchased = () => {
    handlePurchase(cart);
  };

  // Rendering the CartPage component
  return (
    <div className="main">
      <h2 className="cartH2">Cart</h2>
      <div className="cart-page">
        {cart.length === 0 ? (
          // Displaying a message when the cart is empty
          <div className="empty-cart-message">Nothing in the cart. <img src="https://cdn-icons-png.flaticon.com/128/13791/13791534.png" alt="" /></div>
        ) : (
          // Rendering cart items when there are items in the cart
          <div className="cartContainer">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-details">
                  <img className="item-image" src={item.image} alt="" />
                  <h3>{item.name}</h3>
                  <div className="itemPrice">
                    <span>${item.price}</span>
                    <span>
                      {/* Buttons to update item quantity */}
                      <img
                        className="qtyImage"
                        src="https://cdn-icons-png.flaticon.com/128/3524/3524388.png"
                        alt=""
                        onClick={() => updateQuantity(item.id)}
                      />
                      Qty - {item.quantity}{' '}
                      <img
                        className="qtyImage"
                        src="https://cdn-icons-png.flaticon.com/128/56/56889.png"
                        alt=""
                        onClick={() => updateQuantity(item.id, -1)}
                      />
                    </span>
                  </div>
                  {/* Button to remove item from the cart */}
                  <button className="cartButton" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          // Rendering purchasing section only when there are items in the cart
          <aside className="cart-summary">
            <h2>Cart Summary</h2>
            <div className="summary-details">
              {/* Displaying total price and a button to proceed with the purchase */}
              <p>Total Price: ${totalPrice}</p>
              <button className="purchaseButton" onClick={handlePurchased}>
                Purchase
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
