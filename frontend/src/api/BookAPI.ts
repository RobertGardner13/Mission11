import { Book } from "../types/Book";
import React from 'react';

interface FetchBookResponse{
    books : Book[];
    totalNumberOfBooks : number;

}

const API_URL = "https://bookproject-gardnerbackend-f4h0gseretayb7hz.eastus-01.azurewebsites.net";

export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[],
    sortOrder: string
): Promise<FetchBookResponse> => {
    try {
        const categoryParams = selectedCategories.map((cat) => `bookTypes=${encodeURIComponent(cat)}`).join('&');
        const response = await fetch(`${API_URL}?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`);
        
        if (!response.ok) { 
            throw new Error('Failed to fetch books');
        }

        // Log the full response to see what is returned from the API
        const data = await response.json();
        console.log("API Response Data:", data);

        // Ensure the 'totalNumBooks' is available
        if (!data.totalNumberOfBooks) {
            console.error("Missing 'totalNumBooks' in API response");
        }

        return data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }  
};

export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/AddBook`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: 
            JSON.stringify(newBook)
        });  

        if (!response.ok) {
            throw new Error('Failed to add project');
        }

        return await response.json();

    } catch (error) {
        console.error('Error adding project', error);
        throw error;
    }
 }

export const updateBook = async (bookID: number, updatedBook: Book) : Promise<Book> => {
    try{
        const response = await fetch(`${API_URL}/UpdateBook/${bookID}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', 
 
            },
            body: 
            JSON.stringify(updatedBook)
        });  

        return await response.json()

    } catch (error) {
        console.error('Error updating project', error);
        throw error;
    } 
}

export const deleteBook = async (bookID: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            // Capture the error message from the response
            const errorData = await response.json();
            throw new Error(errorData?.message || 'Failed to delete book');
        }

        console.log(`Book with ID ${bookID} deleted successfully.`);
    } catch (error) {
        // Provide more context about the error
        console.error('Error deleting book:', error);
        throw new Error(`Failed to delete book with ID ${bookID}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
