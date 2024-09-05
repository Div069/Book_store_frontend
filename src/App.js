import React from "react";
import Header from "./components/Header";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import AddBook from "./components/AddBook";
import Books from "./components/Book/Books";
import About from "./components/About";
import BookDetail from "./components/Book/BookDetail";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UsersList from "./components/UsersList"; // Import the new UsersList component

const ProtectedRoute = ({ element: Element }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}
            exact
          />
          <Route path="/login" element={<Login />} exact />
          <Route path="/signup" element={<Signup />} exact />
          <Route path="/home" element={<ProtectedRoute element={Home} />} exact />
          <Route path="/add" element={<ProtectedRoute element={AddBook} />} exact />
          <Route path="/books" element={<ProtectedRoute element={Books} />} exact />
          <Route path="/about" element={<ProtectedRoute element={About} />} exact />
          <Route path="/books/:id" element={<ProtectedRoute element={BookDetail} />} exact />
          {/* Add a new route for the UsersList page */}
          <Route path="/users" element={<ProtectedRoute element={UsersList} />} exact />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
