import React, { useState } from "react";
import { AppBar, Tab, Tabs, Toolbar, Typography, Button } from "@mui/material";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("email") === "admin@example.com"; // Check if logged-in user is admin

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <AppBar sx={{ backgroundColor: "#989696" }} position="sticky">
      <Toolbar>
        <NavLink to={isAuthenticated ? "/home" : "/"} style={{ color: "white" }}>
          <Typography>
            <LibraryBooksOutlinedIcon />
          </Typography>
        </NavLink>
        <Tabs
          sx={{ ml: "auto" }}
          textColor="inherit"
          indicatorColor="primary"
          value={value}
          onChange={(e, val) => setValue(val)}
        >
          {isAuthenticated ? (
            <>
              {/* Conditionally render the My Books tab for non-admin users */}
              {!isAdmin && (
                <Tab LinkComponent={NavLink} to="/my-books" label="My Books" />
              )}
              <Tab LinkComponent={NavLink} to="/all-books" label="All Books" />
              <Tab LinkComponent={NavLink} to="/about" label="About Us" />
              <Tab LinkComponent={NavLink} to="/users" label="Members" />
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Tab LinkComponent={NavLink} to="/login" label="Login" />
              <Tab LinkComponent={NavLink} to="/signup" label="Signup" />
            </>
          )}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
