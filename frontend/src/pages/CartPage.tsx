import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem'; // Make sure this import is available if needed

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2>Your Cart:</h2>
          <div>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul className="list-group">
                {cart.map((item: CartItem) => (
                  <li key={item.bookID} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      {item.title}: <strong>${item.price.toFixed(2)}</strong>
                    </div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.bookID)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-3">
            <h3>
              Total: <strong>${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</strong>
            </h3>
          </div>
          <div className="mt-3">
            <button className="btn btn-success">Checkout</button>
            <button className="btn btn-secondary ms-3" onClick={() => navigate('/books')}>
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
