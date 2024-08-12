import React, { useState } from "react";
import { AppBar, Tab, Tabs, Toolbar, Typography, Button } from "@mui/material";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
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
              <Tab LinkComponent={NavLink} to="/add" label="Add Product" />
              <Tab LinkComponent={NavLink} to="/books" label="Books" />
              <Tab LinkComponent={NavLink} to="/about" label="About Us" />
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
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
