import React, { useState, useEffect } from "react";
import { Card } from "antd";
import CategoryInput from "../components/CategoryInput";
import CategoryList from "../components/CategoryList";
import { createCategory, getCategories } from "../services/categoryService"; // Import the createCategory service

const CategoryManagement = ({ userId }) => {
  const [categories, setCategories] = useState<any[]>([]); // Store fetched categories
  const [categoryName, setCategoryName] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Function to fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(); // Fetch categories from the service
        setCategories(data); // Update state with fetched categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories(); // Call fetchCategories when component mounts
  }, []);

  // Function to handle adding or updating a category
  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;

    const newCategory = { name: categoryName, userId };

    if (editingIndex !== null) {
      const updatedCategories = [...categories];
      updatedCategories[editingIndex].name = categoryName;
      setCategories(updatedCategories);
      setEditingIndex(null);
    } else {
      try {
        // Call the createCategory service to add the new category to the backend
        const createdCategory = await createCategory(newCategory);
        setCategories([...categories, createdCategory]); // Add the created category to the state
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }

    setCategoryName(""); // Clear the input field
  };

  const handleEditCategory = (index: number) => {
    setCategoryName(categories[index].name);
    setEditingIndex(index);
  };

  const handleDeleteCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  return (
    <Card title="Category Management">
      <CategoryInput
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        handleAddCategory={handleAddCategory}
        editingIndex={editingIndex}
      />
      <CategoryList
        categories={categories} // Pass categories as a prop
        handleEditCategory={handleEditCategory}
        handleDeleteCategory={handleDeleteCategory}
      />
    </Card>
  );
};

export default CategoryManagement;
