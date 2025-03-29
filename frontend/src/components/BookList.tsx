import { useEffect, useState } from "react";
import { Book } from '../types/Book'
import { useNavigate } from "react-router-dom";
import React from 'react';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPage, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<string>("asc");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            const categoryParams = selectedCategories.map((cat) => `bookTypes=${encodeURIComponent(cat)}`).join('&');
            const response = await fetch(`http://localhost:5125/Books?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`);
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumberOfBooks);
        };

        fetchBooks();
    }, [pageSize, pageNum, sortOrder, selectedCategories]);

    useEffect(() => {
        setTotalPages(Math.ceil(totalItems / pageSize));
    }, [totalItems, pageSize]);

    return (
        <>
            <label>
                Sort by Title:
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </label>
            <br />
            {books.map((b) =>
                <div id="bookCard" className="card" key={b.isbn}>
                    <h3 className="card-title">{b.title}</h3>

                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li><strong>Author</strong>: {b.author}</li>
                            <li><strong>Publisher:</strong> {b.publisher}</li>
                            <li><strong>ISBN:</strong> {b.isbn}</li>
                            <li><strong>Classification/Category:</strong> {b.classification}/{b.category}</li>
                            <li><strong>Number of pages:</strong> {b.pageCount}</li>
                            <li><strong>Price:</strong> {b.price}</li>
                        </ul>

                        <button className='btn btn-success' onClick={() => navigate(`/buy/${b.title}/${b.price}/${b.bookID}`)}>Buy</button>
                    </div>
                </div>
            )}
            <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

            {[...Array(totalPage)].map((_, index) => (
                <button key={index + 1} onClick={() => setPageNum(index + 1)}>
                    {index + 1}
                </button>
            ))}

            <button disabled={pageNum === totalPage} onClick={() => setPageNum(pageNum + 1)}>Next</button>
            <br />
            <label>
                Results per page:
                <select value={pageSize} onChange={(p) => { setPageSize(Number(p.target.value)); setPageNum(1) }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
        </>
    );
}

export default BookList;
