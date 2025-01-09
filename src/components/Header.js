import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("email") === "admin@example.com";

  let lastScrollPosition = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollPosition) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }
      lastScrollPosition = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      style={{
        transform: showHeader ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease-in-out",
        backgroundColor: "#404041",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          Book Haven
        </Typography>

        <Tabs textColor="inherit" indicatorColor="secondary">
          {isAuthenticated ? (
            <>
              <Tab label="My Books" onClick={() => navigate("/my-books")} />
              <Tab label="All Books" onClick={() => navigate("/all-books")} />
              <Tab label="Dashboard" onClick={() => navigate("/dashboard")} />
              <Tab label="About" onClick={() => navigate("/about")} />
              {isAdmin && (
                <Tab
                  label="Transactions"
                  onClick={() => navigate("/transactions")}
                />
              )}
            </>
          ) : (
            <>
              <Tab label="Login" onClick={() => navigate("/login")} />
              <Tab label="Signup" onClick={() => navigate("/signup")} />
            </>
          )}
        </Tabs>

        {isAuthenticated && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
