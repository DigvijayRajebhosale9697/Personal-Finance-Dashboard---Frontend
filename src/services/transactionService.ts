// src/services/transactionService.ts

import api from "./api"; // Import your Axios instance

interface Transaction {
  _id?: string;
  date: string;
  type: "income" | "expense"; // Use lowercase
  category: string;
  amount: number;
}

// Fetch all transactions
export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await api.get("/transactions");
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
};

// Add a new transaction
export const addTransaction = async (newTransaction: Transaction): Promise<Transaction> => {
  try {
    // Ensure type is sent as lowercase
    const response = await api.post("/transactions", {
      ...newTransaction,
      type: newTransaction.type.toLowerCase(), // Normalize to lowercase
    });
    return response.data; // Return the newly added transaction
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw new Error("Failed to add transaction");
  }
};
