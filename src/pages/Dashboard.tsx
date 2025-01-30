import React, { useEffect, useState } from "react";
import { Typography, Spin, Alert } from "antd";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import CategoryChart from "../components/CategoryChart";
import SavingsTracker from "../components/SavingsTracker";
import { getTransactions, Transaction } from "../services/transactionService";

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (err) {
        setError("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <Spin tip="Loading transactions..." />;
  if (error) return <Alert message={error} type="error" showIcon />;

  return (
    <div >
      <IncomeExpenseChart transactions={transactions} />
      <CategoryChart transactions={transactions} />
      <SavingsTracker transactions={transactions} />
    </div>
  );
};

export default Dashboard;
