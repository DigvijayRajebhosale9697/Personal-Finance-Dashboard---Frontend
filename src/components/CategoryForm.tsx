import React from "react";
import { Card, Row, Col, Input, Select, DatePicker, Button } from "antd";

const { Option } = Select;

const IncomeExpenseForm: React.FC = () => {
  return (
    <Card title="Add Category" style={{ marginTop: 20 }}>
      <Row gutter={16}>
        <Col span={6}>
          <Input placeholder="Amount" type="number" />
        </Col>
        <Col span={6}>
          <Select placeholder="Category" style={{ width: "100%" }}>
            <Option value="rent">Rent</Option>
            <Option value="groceries">Groceries</Option>
            <Option value="entertainment">Entertainment</Option>
            <Option value="utilities">Utilities</Option>
            <Option value="others">Others</Option>
          </Select>
        </Col>
        <Col span={6}>
          <DatePicker style={{ width: "100%" }} />
        </Col>
        <Col span={6}>
          <Button type="primary">Add</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default IncomeExpenseForm;
