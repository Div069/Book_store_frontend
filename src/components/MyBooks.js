import React, { useEffect, useState } from "react";
import axios from "axios";
import Book from "./Book/Book";
import { Button, Box, Typography } from "@mui/material";
import "./MyBooks.css";

const MyBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchMyBooks = async () => {
      const token = localStorage.getItem("token");  // Get the token from localStorage

      try {
        // Fetch books belonging to the currently logged-in user
        const response = await axios.get("https://book-store-backend-2gzw.onrender.com/books/user-books", {
          headers: {
            Authorization: `Bearer ${token}`,  // Include token in the Authorization header
          },
        });
        setBooks(response.data.books);
      } catch (err) {
        console.error("Error fetching your books", err);
      }
    };

    fetchMyBooks();
  }, []);

  const handleDeleteBook = async (bookId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`https://book-store-backend-2gzw.onrender.com/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedBooks = books.filter((book) => book._id !== bookId);
      setBooks(updatedBooks);
    } catch (err) {
      console.error("Error deleting the book", err);
    }
  };

  return (
    <>
      {/* Background container */}
      <div className="background-container"></div>

      {/* Main content container */}
      <Box className="my-books-container">
        <Typography variant="h2" component="h1" className="my-books-heading" style={{ fontWeight: "bold", color: "black" }}>
          My Books
        </Typography>

        {books.length === 0 ? (
          <Typography variant="h6">You have no books in your collection.</Typography>
        ) : (
          <Box className="my-books-grid">
            {books.map((book) => (
              <div key={book._id} className="book-card">
                <Book book={book} />
                <Button variant="contained" className="delete-book-button" onClick={() => handleDeleteBook(book._id)}>
                  Delete from My Books
                </Button>
              </div>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default MyBooks;
