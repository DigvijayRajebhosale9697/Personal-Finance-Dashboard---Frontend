import React from "react";
import { Card, Row, Col } from "antd";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Transaction } from "../services/transactionService";

interface Props {
  transactions: Transaction[];
}

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

const CategoryChart: React.FC<Props> = ({ transactions }) => {
  // Group transactions by category
  const incomeCategories: Record<string, number> = {};
  const expenseCategories: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "income") {
      incomeCategories[t.category || "Other"] = (incomeCategories[t.category || "Other"] || 0) + t.amount;
    } else {
      expenseCategories[t.categoryId || "Other"] = (expenseCategories[t.categoryId || "Other"] || 0) + t.amount;
    }
  });

  const incomeData = Object.entries(incomeCategories).map(([name, value]) => ({ name, value }));
  const expenseData = Object.entries(expenseCategories).map(([name, value]) => ({ name, value }));

  return (
    <Row gutter={16} style={{marginTop:"1rem"}}>
      <Col span={12}>
        <Card title="Income by Category">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={incomeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#008000">
                {incomeData.map((_, index) => (
                  <Cell key={`income-cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>

      <Col span={12}>
        <Card title="Expense by Category">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={expenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#FF8042">
                {expenseData.map((_, index) => (
                  <Cell key={`expense-cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
  );
};

export default CategoryChart;
