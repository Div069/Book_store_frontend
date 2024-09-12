import React, { useEffect, useState } from "react";
import axios from "axios";
import Book from "./Book/Book";
import { Button, Box, Typography, CircularProgress, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import "./AllBooks.css";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);  
        setError(null);    

        const response = await axios.get("https://book-store-backend-2gzw.onrender.com/books");
        setBooks(response.data.books);

        const userEmail = localStorage.getItem("email");
        if (userEmail === "admin@example.com") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Error fetching books", err);
        setError("Failed to load books. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);  

  const handleRequestAccess = async (bookId) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      await axios.put(
        `https://book-store-backend-2gzw.onrender.com/books/${bookId}/request`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await axios.get("https://book-store-backend-2gzw.onrender.com/books");
      setBooks(response.data.books); 
    } catch (err) {
      console.error("Error requesting book", err);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`https://book-store-backend-2gzw.onrender.com/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await axios.get("https://book-store-backend-2gzw.onrender.com/books");
      setBooks(response.data.books); 
    } catch (err) {
      console.error("Error deleting book", err);
    }
  };

  return (
    <>
      {/* Background container */}
      <div className="background-container"></div>

      {/* Main content container */}
      <Box className="all-books-container">
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
        <Typography
          variant="h2"
          component="h1"
          className="all-books-heading"
          style={{ fontWeight: "bold", color: "black" }}
        >
          All Books
        </Typography>



          {isAdmin && (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/add"
              className="add-book-button"
              sx={{
                marginTop: 2,
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#115293",
                },
              }}
            >
              Add New Book
            </Button>
          )}
        </Paper>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "50vh" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center" variant="h6">
            {error}
          </Typography>
        ) : books.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: "center", marginTop: 3 }}>
            No books available.
          </Typography>
        ) : (
          <Box className="all-books-grid">
            {books.map((book) => (
              <Box key={book._id} className="book-card" sx={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", borderRadius: 3, overflow: "hidden" }}>
                <Book book={book} showStatus={true} />

                <Typography
                  variant="body1"
                  className={book.available ? "status-available" : "status-unavailable"}
                  sx={{
                    textAlign: "center",
                    padding: "8px",
                    color: book.available ? "#4caf50" : "#f44336",
                    fontWeight: "bold",
                  }}
                >
                  {book.available ? "" : `Owned by ${book.ownerId?.username || "Admin"}`}
                </Typography>

                {book.available && !isAdmin && (
                  <Button
                    variant="contained"
                    className="request-access-button"
                    onClick={() => handleRequestAccess(book._id)}
                    sx={{
                      margin: 1,
                      backgroundColor: "#4caf50",
                      "&:hover": {
                        backgroundColor: "#388e3c",
                      },
                    }}
                  >
                    Request Access
                  </Button>
                )}

                {isAdmin && (
                  <Button
                    variant="contained"
                    className="delete-book-button"
                    onClick={() => handleDeleteBook(book._id)}
                    sx={{
                      margin: 1,
                      backgroundColor: "#f44336",
                      "&:hover": {
                        backgroundColor: "#d32f2f",
                      },
                    }}
                  >
                    Delete Book
                  </Button>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default AllBooks;
