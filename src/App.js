import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import AddBook from "./components/AddBook";
import Books from "./components/Book/Books";
import About from "./components/About";
import BookDetail from "./components/Book/BookDetail";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MyBooks from "./components/MyBooks";
import AllBooks from "./components/AllBooks";
import UsersList from "./components/UsersList";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transaction";
import { Snackbar, Alert } from "@mui/material";

const ProtectedRoute = ({ element: Element }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource("https://book-store-backend-2gzw.onrender.com/books/notifications");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotification(data.message);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<ProtectedRoute element={Home} />} />
          <Route path="/add" element={<ProtectedRoute element={AddBook} />} />
          <Route path="/books" element={<ProtectedRoute element={Books} />} />
          <Route path="/my-books" element={<ProtectedRoute element={MyBooks} />} />
          <Route path="/all-books" element={<ProtectedRoute element={AllBooks} />} />
          <Route path="/about" element={<ProtectedRoute element={About} />} />
          <Route path="/books/:id" element={<ProtectedRoute element={BookDetail} />} />
          <Route path="/users" element={<ProtectedRoute element={UsersList} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
          <Route path="/transactions" element={<ProtectedRoute element={Transactions} />} />
        </Routes>
        {notification && (
          <Snackbar
            open={true}
            autoHideDuration={4000}
            onClose={() => setNotification(null)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert onClose={() => setNotification(null)} severity="info" sx={{ width: "100%" }}>
              {notification}
            </Alert>
          </Snackbar>
        )}
      </main>
    </React.Fragment>
  );
}

export default App;
