import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Select, DatePicker, Radio } from "antd";
import { addTransaction } from "../services/transactionService"; 
import { getCategories } from "../services/categoryService"; 

const { Option } = Select;

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (transaction: any) => void;
}

const AddTransaction: React.FC<Props> = ({ visible, onClose, onAdd }) => {
  const [date, setDate] = useState("");
  const [type, setType] = useState<"income" | "expense">("income"); 
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const data = await getCategories(); 
        setCategories(data); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (visible) {
      fetchCategories();
    }
  }, [visible]);

  const handleSubmit = async () => {
    if (loading) return; 
    if (!date || !category || !amount) {

      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const newTransaction = {
      date,
      type,
      category,
      amount: parseFloat(amount),
    };

    try {
      const addedTransaction = await addTransaction(newTransaction); 
      onAdd(addedTransaction); 
      onClose(); 
    } catch (error) {
      console.error("Error adding transaction:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Modal title="Add Transaction" visible={visible} onCancel={onClose} footer={null}>
      <DatePicker
        style={{ width: "100%", marginBottom: 10 }}
        onChange={(date, dateString) => setDate(dateString)}
      />
      <Radio.Group value={type} onChange={(e) => setType(e.target.value)} style={{ marginBottom: 10 }}>
        <Radio.Button value="income">Income</Radio.Button>
        <Radio.Button value="expense">Expense</Radio.Button>
      </Radio.Group>
      <Select
        placeholder="Category"
        style={{ width: "100%", marginBottom: 10 }}
        onChange={setCategory}
      >
        {categories.map((cat) => (
          <Option key={cat._id} value={cat.name}>
            {cat.name}
          </Option>
        ))}
      </Select>

      <Input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      <div style={{ marginTop: 20 }}>
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading} 
        >
          Submit
        </Button>
        <Button style={{ marginLeft: 10 }} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default AddTransaction;
