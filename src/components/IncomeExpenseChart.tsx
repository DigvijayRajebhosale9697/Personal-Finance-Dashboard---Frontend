import React from "react";
import { Card, Empty } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Transaction } from "../services/transactionService";

interface Props {
  transactions: Transaction[];
}

const IncomeExpenseChart: React.FC<Props> = ({ transactions }) => {
  const dataMap: Record<string, { name: string; Income: number; Expense: number }> = {};

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("en-US", { month: "short", year: "numeric" });

    if (!dataMap[month]) {
      dataMap[month] = { name: month, Income: 0, Expense: 0 };
    }

    if (t.type === "income") {
      dataMap[month].Income += t.amount;
    } else {
      dataMap[month].Expense += t.amount;
    }
  });

  const chartData = Object.values(dataMap).sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

  return (
    <Card title="Income & Expense Overview" style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#008000" name="Income" />
            <Bar dataKey="Expense" fill="#90EE90" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Empty description="No Data Available" style={{ padding: "50px", textAlign: "center" }} />
      )}
    </Card>
  );
};

export default IncomeExpenseChart;
