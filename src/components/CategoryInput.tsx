import React from "react";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface CategoryInputProps {
  categoryName: string;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
  handleAddCategory: () => void;
  editingIndex: number | null;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  categoryName,
  setCategoryName,
  handleAddCategory,
  editingIndex,
}) => {
  return (
    <div>
      <Input
        placeholder="Enter category name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        onPressEnter={handleAddCategory}
      />
      <Button
        type="primary"
        onClick={handleAddCategory}
        icon={<PlusOutlined />}
        style={{ marginTop: 10 }}
      >
        {editingIndex !== null ? "Update Category" : "Add Category"}
      </Button>
    </div>
  );
};

export default CategoryInput;
