import React, { useState, useEffect } from "react";
import { Button, Typography, Table, Space, Input, Row, Col, Modal, Card } from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import AddTransaction from "./AddTransaction";
import { getTransactions, addTransaction } from "../services/transactionService"; // Import the service functions

const { Title } = Typography;

interface Transaction {
  _id: string;
  date: string;
  type: "Income" | "Expense";
  category: string;
  amount: number;
}

const TransactionsList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); // State for AddTransaction modal
  const [isTransactionDetailModalVisible, setIsTransactionDetailModalVisible] = useState(false); // State for Transaction Detail modal
  const [transactionDetail, setTransactionDetail] = useState<Transaction | null>(null); // Store the selected transaction details
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    // Fetch transactions from the API on component mount
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(); // Fetch transactions using the service
        setTransactions(data); // Set data from the response
        setFilteredTransactions(data); // Set data to filtered transactions initially
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleAddTransaction = async (newTransaction: Transaction) => {
    try {
      const addedTransaction = await addTransaction(newTransaction); // Add transaction using the service
      setTransactions([...transactions, addedTransaction]); // Add the new transaction to the list
      setFilteredTransactions([...filteredTransactions, addedTransaction]); // Add to filtered transactions as well
      setIsAddModalVisible(false); // Close the AddTransaction modal after adding the transaction
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = transactions.filter((transaction) =>
      transaction.category.toLowerCase().includes(value.toLowerCase()) ||
      transaction.type.toLowerCase().includes(value.toLowerCase()) ||
      transaction.date.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const handleViewTransaction = (transaction: Transaction) => {
    setTransactionDetail(transaction); // Set the selected transaction data
    setIsTransactionDetailModalVisible(true); // Show the Transaction Detail modal
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `₹${amount.toFixed(2)}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: Transaction) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => handleViewTransaction(record)} // Open the Transaction Detail modal with transaction details
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Card title="Transaction List" style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
      {/* Header with search and Add button */}
      <Row justify="space-between" align="middle">
        <Col>
          <Input
            placeholder="Search by Category, Type or Date"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 300 }}
          />
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalVisible(true)} // Open AddTransaction modal
          >
            Add Transaction
          </Button>
        </Col>
      </Row>

      {/* Table for transactions */}
      <Table
        columns={columns}
        dataSource={filteredTransactions}
        rowKey="_id"
        pagination={{ pageSize: 5 }} // Pagination added
        bordered
        style={{ marginTop: 20 }}
      />

      {/* Add Transaction Modal */}
      <AddTransaction
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)} // Close AddTransaction modal
        onAdd={handleAddTransaction}
      />

      {/* Transaction Detail Modal */}
      <Modal
        visible={isTransactionDetailModalVisible && transactionDetail !== null}
        onCancel={() => setIsTransactionDetailModalVisible(false)} // Close Transaction Detail modal
        footer={null}
      >
        {transactionDetail && (
          <div>
            <p><strong>Date:</strong> {transactionDetail.date}</p>
            <p><strong>Type:</strong> {transactionDetail.type}</p>
            <p><strong>Category:</strong> {transactionDetail.category}</p>
            <p><strong>Amount:</strong> ₹{transactionDetail.amount.toFixed(2)}</p>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default TransactionsList;
