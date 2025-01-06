import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  CircularProgress,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Alert,
  TableContainer,
} from "@mui/material";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("https://book-store-backend-2gzw.onrender.com/transactions/all", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTransactions(response.data.transactions);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to load transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
  }

  if (!transactions.length) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
        No transactions found.
      </Typography>
    );
  }

  const renderActionType = (action) => {
    switch (action) {
      case "ADD":
        return <span style={{ color: "green", fontWeight: "bold" }}>Added to Library</span>;
      case "REQUEST":
        return <span style={{ color: "blue", fontWeight: "bold" }}>Requested by User</span>;
      case "REMOVE":
        return <span style={{ color: "orange", fontWeight: "bold" }}>Removed from User</span>;
      case "DELETE_DB":
        return <span style={{ color: "red", fontWeight: "bold" }}>Deleted by Admin</span>;
      default:
        return <span style={{ color: "gray" }}>Unknown Action</span>;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        User Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Book</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction._id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                  },
                  transition: "background-color 0.3s ease",
                }}
              >
                <TableCell>{transaction.userId?.email || "Unknown Email"}</TableCell>
                <TableCell>{transaction.bookId?.name || "Unknown Book"}</TableCell>
                <TableCell>{renderActionType(transaction.action)}</TableCell>
                <TableCell>{new Date(transaction.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Transactions;
