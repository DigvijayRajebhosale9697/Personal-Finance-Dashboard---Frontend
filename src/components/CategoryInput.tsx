import React from "react";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface CategoryInputProps {
  categoryName: string;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
  handleAddCategory: () => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  categoryName,
  setCategoryName,
  handleAddCategory,
}) => {
  return (
    <div className="CateoryInput">
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
      >
        Add Category
      </Button>
    </div>
  );
};

export default CategoryInput;
