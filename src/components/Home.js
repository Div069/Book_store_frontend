import { Button, Typography, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import cover from "./Online-Book-Store-Logo-Generator-VL007.jpeg";

const Home = () => {
  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundImage: `url(${cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.9)', // Adjust the rgba values to set opacity
            zIndex: 1,
          }
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            color: 'white',
            mb: 3,
            zIndex: 2, // Ensure text is above the overlay
            animation: 'fadeIn 2s ease-in-out', // Apply fade-in animation
            '@keyframes fadeIn': {
              '0%': { opacity: 0, color: 'rgba(255, 255, 255, 0.5)' }, // Start as faded with lighter color
              '100%': { opacity: 1, color: 'rgba(255, 255, 255, 1)' } // End with full opacity and dark color
            }
          }}
        >
          WELCOME!
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            color: 'white',
            mb: 3,
            zIndex: 2, // Ensure text is above the overlay
            animation: 'fadeIn 3s ease-in-out', // Delay the fade-in for this text
            '@keyframes fadeIn': {
              '0%': { opacity: 0, color: 'rgba(255, 255, 255, 0.5)' }, // Start as faded with lighter color
              '100%': { opacity: 1, color: 'rgba(255, 255, 255, 1)' } // End with full opacity and dark color
            }
          }}
        >
          to Book Haven
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{
            color: 'white',
            mb: 3,
            zIndex: 2, // Ensure text is above the overlay
            animation: 'fadeIn 4s ease-in-out', // Delay the fade-in for this text
            '@keyframes fadeIn': {
              '0%': { opacity: 0, color: 'rgba(255, 255, 255, 0.5)' }, // Start as faded with lighter color
              '100%': { opacity: 1, color: 'rgba(255, 255, 255, 1)' } // End with full opacity and dark color
            }
          }}
        >
          Your Gateway to a World of Books
        </Typography>
        <Button
          LinkComponent={Link}
          to="/books"
          sx={{
            marginTop: 15,
            color: "black",
            borderRadius: 24,
            backgroundColor: "#e88268",
            "&:hover": {
              backgroundColor: "#e2c3a6", // Fixed color value format
            },
            zIndex: 2, // Ensure button is above the overlay
          }}
          variant="contained"
        >
          <Typography variant="h6" fontWeight={600} color={"white"}>
            Click here to View All Products
          </Typography>
        </Button>
      </Box>
    </div>
  );
};

export default Home;
