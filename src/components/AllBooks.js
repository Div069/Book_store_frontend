import React, { useEffect, useState } from "react";
import axios from "axios";
import Book from "./Book/Book";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import "./AllBooks.css";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state for debugging

  // Data fetching with improved error handling
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);  // Set loading to true when starting to fetch
        setError(null);    // Reset error before making the request

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
        setLoading(false); // Always set loading to false after fetching
      }
    };

    fetchBooks();
  }, []);  // The empty dependency array ensures it only runs once after mount

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
      setBooks(response.data.books); // Refresh books after requesting access
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
      setBooks(response.data.books); // Refresh books after deleting
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
          >
            Add New Book
          </Button>
        )}

        {loading ? ( // Show a loading spinner while data is being fetched
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : error ? ( // Show error message if there was an issue fetching data
          <Typography color="error" align="center" variant="h6">
            {error}
          </Typography>
        ) : books.length === 0 ? ( // Show a message if no books are available
          <Typography variant="h6">No books available.</Typography>
        ) : (
          <Box className="all-books-grid">
            {books.map((book) => (
              <div key={book._id} className="book-card">
                {/* Pass showStatus={true} to display the availability status */}
                <Book book={book} showStatus={true} />
                
                {book.available ? (
                  <Typography variant="body1" className="status-available">
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    style={{ textAlign: "center" }}
                    className="status-unavailable"
                  >
                    Owned by {book.ownerId?.username || "Admin"} (
                    {book.ownerId?.email || "admin@example.com"})
                  </Typography>
                )}

                {book.available && !isAdmin && (
                  <Button
                    variant="contained"
                    className="request-access-button"
                    onClick={() => handleRequestAccess(book._id)}
                  >
                    Request Access
                  </Button>
                )}

                {isAdmin && (
                  <Button
                    variant="contained"
                    className="delete-book-button"
                    onClick={() => handleDeleteBook(book._id)}
                  >
                    Delete Book
                  </Button>
                )}
              </div>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default AllBooks;
