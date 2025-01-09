import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography } from "@mui/material";
import Notification from "./Notification"; // Import Notification component
import "./AddBook.css";

const AddBook = () => {
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [available, setAvailable] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Notification state
  const [notification, setNotification] = useState(null);

  // Check if the logged-in user is admin
  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail === "admin@example.com") {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "https://book-store-backend-2gzw.onrender.com/books/add-or-update",
        {
          name,
          author,
          description,
          price,
          image,
          available,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setNotification("Book updated successfully!");
      } else if (response.status === 201) {
        setNotification("Book added successfully!");
      }

      setTimeout(() => {
        navigate("/all-books");
      }, 2000); // Redirect after showing notification
    } catch (err) {
      console.error("Error while adding/updating the book:", err);
      setError("Failed to add or update the book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Notification Component */}
      <Notification
        message={notification}
        onClose={() => setNotification(null)}
      />

      <form onSubmit={handleSubmit} className="add-book-form">
        <Typography variant="h4" component="h1" gutterBottom>
          {loading ? "Processing..." : "Add or Update Book"}
        </Typography>

        <TextField
          label="Book Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          multiline
          fullWidth
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 3 }}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>

        {error && <Typography color="error">{error}</Typography>}
      </form>
    </>
  );
};

export default AddBook;
