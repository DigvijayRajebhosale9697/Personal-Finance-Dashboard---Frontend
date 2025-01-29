import React from "react";
import { Card } from "antd";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const ExpenseChart: React.FC = () => {
  const expenseCategories = [
    { name: "Rent", amount: 1200 },
    { name: "Groceries", amount: 800 },
    { name: "Entertainment", amount: 500 },
    { name: "Utilities", amount: 300 },
    { name: "Others", amount: 200 },
  ];

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

  return (
    <Card title="Expense Distribution">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={expenseCategories} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {expenseCategories.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ExpenseChart;
