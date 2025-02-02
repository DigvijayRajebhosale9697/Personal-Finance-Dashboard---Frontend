import api from "./api"; 

// const CATEGORY_API_URL = "http://localhost:5000/api/categories";
const CATEGORY_API_URL = "https://personal-finance-dashboard-backend.onrender.com/api/categories";

interface Category {
  _id: string;
  name: string;
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get("/categories"); 
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

export const deleteCategoryById = async (id: string) => {
  try {
    const response = await api.delete(`${CATEGORY_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw new Error("Failed to delete category");
  }
};

export const editCategoryById = async (id: string, updatedData: { name: string }) => {
  try {
    const response = await api.put(`${CATEGORY_API_URL}/${id}`, updatedData); 
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};



export const createCategory = async (category: { name: string}) => {
    try {
      const response = await api.post("/categories", category); 
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error("Failed to create category");
    }
  };