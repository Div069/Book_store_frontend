import React, { useState } from "react";
import { AppBar, Tab, Tabs, Toolbar, Typography, Button, IconButton, useMediaQuery } from "@mui/material";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Adjust based on screen size

  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("email") === "admin@example.com";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#6d6d6d", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)" }}>
      <Toolbar>
        {/* Brand Logo */}
        <NavLink to={isAuthenticated ? "/home" : "/"} style={{ textDecoration: "none", color: "white" }}>
          <Typography variant="h6" noWrap sx={{ display: "flex", alignItems: "center" }}>
            <LibraryBooksOutlinedIcon sx={{ fontSize: 28, mr: 1 }} />
            <span>Book Haven</span>
          </Typography>
        </NavLink>

        {/* Responsive Tabs or Menu Icon */}
        {isMobile ? (
          <IconButton sx={{ ml: "auto", color: "white" }}>
            <MenuIcon />
          </IconButton>
        ) : (
          <Tabs
            sx={{ ml: "auto" }}
            textColor="inherit"
            indicatorColor="primary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            {isAuthenticated ? (
              <>
                {!isAdmin && <Tab LinkComponent={NavLink} to="/my-books" label="My Books" />}
                <Tab LinkComponent={NavLink} to="/all-books" label="All Books" />
                <Tab LinkComponent={NavLink} to="/about" label="About Us" />
                <Tab LinkComponent={NavLink} to="/users" label="Members" />
                <Button onClick={handleLogout} sx={{ ml: 2, color: "white", fontWeight: "bold" }}>
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
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
