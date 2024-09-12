import React, { useEffect, useState } from "react";
import axios from "axios";
import Book from "./Book/Book";
import { Button, Box, Typography, Paper } from "@mui/material";
import "./MyBooks.css";

const MyBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchMyBooks = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("https://book-store-backend-2gzw.onrender.com/books/user-books", {
          headers: {
            Authorization: `Bearer ${token}`,
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
      <div className="background-container"></div>

      <Box className="my-books-container">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(8px)",
            marginBottom: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h2" component="h1" className="my-books-heading" style={{ fontWeight: "bold", color: "black" }}>
          My Books
        </Typography>
        </Paper>

        {books.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: "center", marginTop: 3 }}>
            You have no books in your collection.
          </Typography>
        ) : (
          <Box className="my-books-grid">
            {books.map((book) => (
              <div key={book._id} className="book-card">
                <Book book={book} showStatus={false} />
                <Button
                  variant="contained"
                  className="delete-book-button"
                  onClick={() => handleDeleteBook(book._id)}
                  sx={{
                    marginTop: "10px",
                    backgroundColor: "#f44336",
                    "&:hover": {
                      backgroundColor: "#d32f2f",
                    },
                  }}
                >
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
