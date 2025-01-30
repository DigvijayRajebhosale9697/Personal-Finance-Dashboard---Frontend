import React, { useState, useEffect } from "react";
import { Card, message, Modal, Input } from "antd";
import CategoryInput from "../components/CategoryInput";
import CategoryList from "../components/CategoryList";
import { createCategory, getCategories, editCategoryById, deleteCategoryById } from "../services/categoryService";

const CategoryManagement = ({ userId }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string } | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;
    try {
      const newCategory = { name: categoryName, userId };
      const createdCategory = await createCategory(newCategory);
      setCategories([...categories, createdCategory]);
      setCategoryName("");
      message.success("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Handle editing a category (Show Modal)
  const handleEditCategory = (id: string, currentName: string) => {
    setEditingCategory({ id, name: currentName });
    setIsEditModalVisible(true);
  };

  // Confirm category edit and update in DB
  const handleUpdateCategory = async () => {
    if (editingCategory) {
      try {
        await editCategoryById(editingCategory.id, { name: editingCategory.name });
        message.success("Category updated successfully!");
        setIsEditModalVisible(false);
        setEditingCategory(null);
        fetchCategories(); // Refresh category list
      } catch (error) {
        message.error("Failed to update category.");
      }
    }
  };

  // Handle category deletion
  const handleDeleteCategory = async (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteCategoryById(id);
          message.success("Category deleted successfully!");
          fetchCategories();
        } catch (error) {
          message.error("Failed to delete category.");
        }
      },
    });
  };

  return (
    <Card title="Category Management">
      <CategoryInput
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        handleAddCategory={handleAddCategory}
      />
      <CategoryList
        categories={categories}
        handleEditCategory={handleEditCategory}
        handleDeleteCategory={handleDeleteCategory}
      />

      {/* Edit Category Modal */}
      <Modal
        title="Edit Category"
        open={isEditModalVisible}
        onOk={handleUpdateCategory}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Input
          value={editingCategory?.name}
          onChange={(e) => setEditingCategory({ ...editingCategory!, name: e.target.value })}
        />
      </Modal>
    </Card>
  );
};

export default CategoryManagement;
