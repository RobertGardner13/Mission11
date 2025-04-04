import { useEffect, useState } from "react";
import { Book } from '../types/Book'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { fetchBooks } from "../api/BookAPI";
import Pagination from "./Pagination";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPage, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<string>("asc");
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, selectedCategories, sortOrder);

                console.log("Total Books:", data.totalNumberOfBooks);
                console.log("Page Size:", pageSize);
                console.log("Calculated Total Pages:", Math.ceil(data.totalNumberOfBooks / pageSize));
                console.log("Final Total Pages Set:", Math.max(1, Math.ceil(data.totalNumberOfBooks / pageSize) || 1));

                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumberOfBooks / pageSize));




            } catch(error){
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
            
        };

        loadBooks();
    }, [pageSize, pageNum, sortOrder, selectedCategories]);


    if (loading) return <p>Loading books....</p>
    if (error) return <p className='text-red-500'>Error: {error}</p>

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
            <Pagination
                        currentPage={pageNum}
                        totalPage={totalPage}
                        pageSize={pageSize}
                        onPageChange={setPageNum}
                        onPageSizeChange={(newSize) => {
                        setPageSize(newSize);
                        setPageNum(1);                        }}
            />
            
        </>
    );
}

export default BookList;
