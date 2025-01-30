import  { useState, useEffect } from "react";
import { Card, message, Modal, Input, Row, Col, Spin } from "antd";
import CategoryInput from "../components/CategoryInput";
import CategoryList from "../components/CategoryList";
import {
  createCategory,
  getCategories,
  editCategoryById,
  deleteCategoryById,
} from "../services/categoryService";

const CategoryManagement = ({ userId }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string } | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a new category with duplicate check
  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;

    const isDuplicate = categories.some(
      (category) => category.name.toLowerCase() === categoryName.trim().toLowerCase()
    );

    if (isDuplicate) {
      message.warning("Category already exists!");
      return;
    }

    try {
      setLoading(true);
      const newCategory = { name: categoryName, userId };
      const createdCategory = await createCategory(newCategory);
      setCategories([...categories, createdCategory]);
      setCategoryName("");
      message.success("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      message.error("Failed to add category.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = (id: string, currentName: string) => {
    setEditingCategory({ id, name: currentName });
    setIsEditModalVisible(true);
  };

  // Confirm category edit and update in DB
  const handleUpdateCategory = async () => {
    if (!editingCategory || !editingCategory.name.trim()) return;
  
    const isDuplicate = categories.some(
      (category) =>
        category.name.toLowerCase() === editingCategory.name.trim().toLowerCase() &&
        category._id !== editingCategory.id 
    );
  
    if (isDuplicate) {
      message.warning("Category with this name already exists!");
      return;
    }
  
    try {
      setLoading(true);
      await editCategoryById(editingCategory.id, { name: editingCategory.name });
  
      setCategories(
        categories.map((category) =>
          category._id === editingCategory.id ? { ...category, name: editingCategory.name } : category
        )
      );
      message.success("Category updated successfully!");
      setIsEditModalVisible(false);
      setEditingCategory(null);
    } catch (error) {
      message.error("Failed to update category.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteCategory = async (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          setLoading(true);
  
          setCategories((prevCategories) => prevCategories.filter((category) => category._id !== id));
  
          await deleteCategoryById(id);
  
          message.success("Category deleted successfully!");
        } catch (error) {
          message.error("Failed to delete category.");
        } finally {
          setLoading(false);
        }
      },
    });
  };
  
  return (
    <Row justify="center">
      <Col xs={24} sm={22}>
        <Card title="Category Management" style={{ maxWidth: "1200px", width: "100%", margin: "0 auto"  }}>
          {loading && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
              <Spin size="large" />
            </div>
          )}

          <CategoryInput
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            handleAddCategory={handleAddCategory}
          />

          <div style={{ overflowX: "auto" }}>
            <CategoryList
              categories={categories}
              handleEditCategory={handleEditCategory}
              handleDeleteCategory={handleDeleteCategory}
            />
          </div>


          <Modal
            title="Edit Category"
            open={isEditModalVisible}
            onOk={handleUpdateCategory}
            onCancel={() => setIsEditModalVisible(false)}
          >
            <Input
              value={editingCategory?.name}
              onChange={(e) =>
                setEditingCategory((prev) => ({ ...prev!, name: e.target.value }))
              }
            />
          </Modal>
        </Card>
      </Col>
    </Row>
  );
};

export default CategoryManagement;
