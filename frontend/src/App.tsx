import React from 'react';
import { Routes, Route } from 'react-router-dom'; // For routing within App
import BooksPage from './pages/BooksPage';
import BuyPage from './pages/BuyPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
  return (
    <div>
      {/* CartProvider should wrap all the routes so that children can access the context */}
      <CartProvider>
        <Routes>
          {/* Define routes here */}
          <Route path="/" element={<BooksPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/buy/:title/:price/:bookID" element={<BuyPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/adminbooks" element={<AdminBooksPage />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
