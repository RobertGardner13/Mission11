import BookList from '../components/BookList';
import CartSummary from '../components/CartSummary';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import { useState } from 'react';
import React from 'react';

function BooksPage() { 
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container-fluid">
      {/* First row for CartSummary and WelcomeBand */}
      <div className="row bg-primary text-white">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <CartSummary />
          <WelcomeBand />
        </div>
      </div>

      {/* Second row for CategoryFilter and BookList */}
      <div className="row mt-4">
        {/* CategoryFilter on the left, taking up 3/12 of the space */}
        <div className="col-md-3">
          <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
        </div>

        {/* BookList on the right, taking up 9/12 of the space */}
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
