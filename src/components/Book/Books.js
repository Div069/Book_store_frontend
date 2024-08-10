import React, { useEffect, useState } from "react";
import "./Book.css";
import axios from "axios";
import Book from "./Book";

const URL = "https://book-store-tr0n.onrender.com/books";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const Books = () => {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    fetchHandler().then((data) => setBooks(data.books));
  }, []);

  return (
    <div className="books-container">
      <div className="books-overlay"></div>
      <div className="books-content">
        <ul>
          {books &&
            books.map((book, i) => (
              <li key={i}>
                <Book book={book} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Books;
