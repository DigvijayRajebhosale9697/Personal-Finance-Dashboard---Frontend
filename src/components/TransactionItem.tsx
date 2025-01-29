import React from "react";
import { List, Typography } from "antd";
import { DollarCircleOutlined, HomeOutlined, CarOutlined } from "@ant-design/icons";

const { Text } = Typography;

const categoryIcons: { [key: string]: JSX.Element } = {
  "Housing": <HomeOutlined style={{ color: "red" }} />,
  "Transportation": <CarOutlined style={{ color: "red" }} />,
  "Wage, invoices": <DollarCircleOutlined style={{ color: "green" }} />,
  "Interests, dividends": <DollarCircleOutlined style={{ color: "green" }} />,
};

interface TransactionProps {
  transaction: {
    date: string;
    type: "Income" | "Expense";
    category: string;
    amount: number;
  };
}

const TransactionItem: React.FC<TransactionProps> = ({ transaction }) => {
  return (
    <List.Item>
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        {categoryIcons[transaction.category] || <DollarCircleOutlined />}
        <Text style={{ flex: 1, marginLeft: 10 }}>{transaction.date}</Text>
        <Text>{transaction.type} · {transaction.category}</Text>
        <Text style={{ marginLeft: "auto", color: transaction.amount > 0 ? "green" : "red" }}>
          {transaction.amount > 0 ? `+$${transaction.amount}` : `-$${Math.abs(transaction.amount)}`}
        </Text>
      </div>
    </List.Item>
  );
};

export default TransactionItem;
