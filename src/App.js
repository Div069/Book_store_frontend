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
import MyBooks from "./components/MyBooks";  
import AllBooks from "./components/AllBooks";  
import UsersList from "./components/UsersList";  // Import the UsersList component

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
          <Route path="/my-books" element={<ProtectedRoute element={MyBooks} />} exact /> 
          <Route path="/all-books" element={<ProtectedRoute element={AllBooks} />} exact /> 
          <Route path="/about" element={<ProtectedRoute element={About} />} exact />
          <Route path="/books/:id" element={<ProtectedRoute element={BookDetail} />} exact />
          <Route path="/users" element={<ProtectedRoute element={UsersList} />} exact />  {/* Members Route */}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
