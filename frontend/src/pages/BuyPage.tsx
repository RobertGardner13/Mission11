import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import WelcomeBand from "../components/WelcomeBand";
import { Modal, Toast } from 'react-bootstrap'; // Import Bootstrap Modal and Toast

function BuyPage() {
  const navigate = useNavigate();
  const { title } = useParams();
  const { price } = useParams();
  const { bookID } = useParams();
  const { addToCart } = useCart();

  // State for managing the modal and toast
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || "No book found",
      price: Number(price),
    };
    addToCart(newItem);

    // Show the modal and toast after adding to cart
    setShowModal(true);
    setShowToast(true);
  };

  return (
    <div className="container">
      {/* Welcome band section */}
      <div className="row bg-primary text-white py-3">
        <WelcomeBand />
      </div>

      {/* Book details section */}
      <div className="row mt-4">
        <div className="col-md-8 offset-md-2">
          <h2>Buy {title}</h2>
          <div className="card p-3">
            <h4>Price: ${price}</h4>
            <button
              className="btn btn-primary mt-3"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="row mt-4">
        <div className="col-md-8 offset-md-2">
          <button
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Item Added to Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{title} has been added to your cart. Do you want to go to your cart?</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Close
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/cart')}>
            Go to Cart
          </button>
        </Modal.Footer>
      </Modal>

      {/* Toast notification */}
      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        className="position-fixed bottom-0 end-0 m-3" 
        bg="success"
        delay={3000}
        autohide
      >
        <Toast.Body>Item added to cart!</Toast.Body>
      </Toast>
    </div>
  );
}

export default BuyPage;

