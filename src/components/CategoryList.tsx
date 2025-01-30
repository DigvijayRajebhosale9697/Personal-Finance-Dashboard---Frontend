import React from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Category {
  _id: string;
  name: string;
}

interface CategoryListProps {
  categories: Category[];
  handleEditCategory: (id: string, name: string) => void;
  handleDeleteCategory: (id: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  handleEditCategory,
  handleDeleteCategory,
}) => {
  const columns = [
    {
      title: "SR NO.",
      dataIndex: "srNo",
      key: "srNo",
      width: 100,
      render: (_: any, __: any, index: number) => index + 1, // Generate serial number
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_: any, record: Category) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditCategory(record._id, record.name)}
            style={{ marginRight: 8 }}
          />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteCategory(record._id)} />
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={categories.map((cat, index) => ({ ...cat, srNo: index + 1 }))}
      rowKey="_id"
      bordered
      pagination={{ pageSize: 5 }}
      style={{ marginTop: 20 }}
    />
  );
};

export default CategoryList;
