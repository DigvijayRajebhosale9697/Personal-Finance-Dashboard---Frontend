import React from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Category {
  _id: string;
  name: string;
}

interface CategoryListProps {
  categories: Category[]; // Define the expected category structure
  handleEditCategory: (index: number) => void;
  handleDeleteCategory: (index: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  handleEditCategory,
  handleDeleteCategory,
}) => {
  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (_, record: Category, index: number) => (
    //     <span>
    //       <Button
    //         icon={<EditOutlined />}
    //         onClick={() => handleEditCategory(index)}
    //         style={{ marginRight: 10 }}
    //       />
    //       <Button
    //         icon={<DeleteOutlined />}
    //         danger
    //         onClick={() => handleDeleteCategory(index)}
    //       />
    //     </span>
    //   ),
    // },
  ];

  return (
    <Table
      columns={columns}
      dataSource={categories}
      rowKey="_id" // Assuming each category has a unique _id
      bordered
      pagination={{ pageSize: 5 }} // You can customize the page size
      style={{ marginTop: 20 }}
    />
  );
};

export default CategoryList;
