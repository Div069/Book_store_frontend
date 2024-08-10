import { Box, Typography } from "@mui/material";
import React from "react";
import "./About.css"; // Ensure you have this CSS file for the background

const About = () => {
  return (
    <div className="about-container">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className="content-box"
      >
        <Typography
          sx={{
            fontFamily: "fantasy",
            mb: 2,
            animation: 'fadeIn 2s ease-in-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, color: 'rgba(51, 51, 51, 0.5)' },
              '100%': { opacity: 1, color: 'rgba(51, 51, 51, 1)' },
            },
          }}
          variant="h2"
        >
          About Us
        </Typography>
        <Typography
          sx={{
            fontFamily: "fantasy",
            mb: 2,
            animation: 'fadeIn 3s ease-in-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, color: 'rgba(51, 51, 51, 0.5)' },
              '100%': { opacity: 1, color: 'rgba(51, 51, 51, 1)' },
            },
          }}
          variant="h5"
        >
          Welcome to Book Haven!
        </Typography>
        <Typography
          sx={{
            fontFamily: "sans-serif",
            mb: 3,
            animation: 'fadeIn 4s ease-in-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, color: 'rgba(102, 102, 102, 0.5)' },
              '100%': { opacity: 1, color: 'rgba(102, 102, 102, 1)' },
            },
          }}
          variant="body1"
        >
          At Book Haven, we are passionate about providing a curated selection of the best books for avid readers and book lovers alike. Our collection ranges from timeless classics to the latest bestsellers, ensuring that there’s something for everyone. Whether you’re looking for a thrilling mystery, an inspiring biography, or a heartfelt romance, our diverse inventory has you covered.
        </Typography>
        <Typography
          sx={{
            fontFamily: "fantasy",
            mb: 1,
            animation: 'fadeIn 5s ease-in-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, color: 'rgba(85, 85, 85, 0.5)' },
              '100%': { opacity: 1, color: 'rgba(85, 85, 85, 1)' },
            },
          }}
          variant="h6"
        >
          -Author:
        </Typography>
        <Typography
          sx={{
            fontFamily: "fantasy",
            animation: 'fadeIn 6s ease-in-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, color: 'rgba(51, 51, 51, 0.5)' },
              '100%': { opacity: 1, color: 'rgba(51, 51, 51, 1)' },
            },
          }}
          variant="h5"
        >
          Divyansh Gupta
        </Typography>
      </Box>
    </div>
  );
};

export default About;
