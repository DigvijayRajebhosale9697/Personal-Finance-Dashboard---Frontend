import React, { useState, useEffect } from "react";
import { Button, Table, Input, Row, Col, Modal, Card, Spin } from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import AddTransaction from "./AddTransaction";
import { getTransactions, addTransaction } from "../services/transactionService";
import { useNavigate } from 'react-router-dom';


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
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isTransactionDetailModalVisible, setIsTransactionDetailModalVisible] = useState(false);
  const [transactionDetail, setTransactionDetail] = useState<Transaction | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Added loading state

  const navigate = useNavigate();


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(); 
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []); // T
  
  const handleAddTransaction = async (newTransaction: Transaction) => {
    try {
      setLoading(true); 
      navigate('/dashboard');
      const addedTransaction = await addTransaction(newTransaction);
      
      // Ensure addedTransaction is of type Transaction
      if (addedTransaction) {
        setTransactions((prev) => [...prev, addedTransaction]);
        setFilteredTransactions((prev) => [...prev, addedTransaction]);
      }
      
      setIsAddModalVisible(false);
      setLoading(false); 
      

    } catch (error) {
      setLoading(false); 
      console.error("Error adding transaction:", error);
    }
  };
  
  

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = transactions.filter(
      (transaction) =>
        transaction.category.toLowerCase().includes(value.toLowerCase()) ||
        transaction.type.toLowerCase().includes(value.toLowerCase()) ||
        transaction.date.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const handleViewTransaction = (transaction: Transaction) => {
    setTransactionDetail(transaction);
    setIsTransactionDetailModalVisible(true);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => {
        const formattedDate = new Date(date).toLocaleDateString("en-GB");
        return formattedDate;
      },
      responsive: ["xs", "sm", "md", "lg"], 
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      responsive: ["sm", "md", "lg"], 
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ["sm", "md", "lg"], 
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `₹${amount.toFixed(2)}`,
      responsive: ["xs", "sm", "md", "lg"], 
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Transaction) => (
        <Button icon={<EyeOutlined />} onClick={() => handleViewTransaction(record)}>
          View
        </Button>
      ),
      responsive: ["xs", "sm", "md", "lg"], 
    },
  ];
  
  

  return (
    <Card title="Transaction List" className="TransactionList">
      <Row justify="space-between" align="middle" gutter={[16, 16]} wrap>
        <Col xs={24} sm={12}>
          <Input
            placeholder="Search by Category, Type or Date"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={24} sm={12} style={{ textAlign: "right" }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalVisible(true)}>
            Add Transaction
          </Button>
        </Col>
      </Row>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={filteredTransactions}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          bordered
          style={{ marginTop: 20 }}
          scroll={{ x: "max-content" }}
        />
      </Spin>

      {/* Add Transaction Modal */}
      <AddTransaction visible={isAddModalVisible} onClose={() => setIsAddModalVisible(false)} onAdd={handleAddTransaction} />

      {/* Transaction Detail Modal */}
      <Modal
        open={isTransactionDetailModalVisible && transactionDetail !== null}
        onCancel={() => setIsTransactionDetailModalVisible(false)}
        footer={null}
        width="90%"
        style={{ maxWidth: 400, margin: "0 auto" }}
      >
        {transactionDetail && (
          <div>
            <p>
              <strong>Date:</strong> {transactionDetail.date}
            </p>
            <p>
              <strong>Type:</strong> {transactionDetail.type}
            </p>
            <p>
              <strong>Category:</strong> {transactionDetail.category}
            </p>
            <p>
              <strong>Amount:</strong> ₹{transactionDetail.amount.toFixed(2)}
            </p>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default TransactionsList;
