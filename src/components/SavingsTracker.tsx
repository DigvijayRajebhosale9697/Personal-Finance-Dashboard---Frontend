import React from "react";
import { Card, Progress } from "antd";
import { Transaction } from "../services/transactionService";

interface Props {
  transactions: Transaction[];
}

const SavingsTracker: React.FC<Props> = ({ transactions }) => {
  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  
  const savings = totalIncome - totalExpense;
  const savingsGoal = 10000;
  const savingsPercentage = (savings / savingsGoal) * 100;

  return (
    <Card title="Savings Tracker" style={{marginTop:"1rem"}}>
      <Progress percent={Math.min(savingsPercentage, 100)} status="active" />
      <p>₹{savings} saved out of ₹{savingsGoal} goal</p>
    </Card>
  );
};

export default SavingsTracker;
