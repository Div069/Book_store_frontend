import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./Book.css";

const Book = (props) => {
  const { name, author, description, price, available, image, ownerId } = props.book;

  return (
    <Card className="book-card">
      <CardContent>
        <img src={image} alt={name} className="book-image" />
        <Typography variant="h6">By {author}</Typography>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body2">{description || 'No description available'}</Typography>
        <Typography variant="h6">Rs {price}</Typography>
        <Typography
          variant="body1" style={{ textAlign: 'center' }}
          className={available ? "status-available" : "status-unavailable"}
        >
           {available ? "Available" : "Unavailable"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Book;
