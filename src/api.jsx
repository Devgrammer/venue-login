
import axios from "axios";

const BASE_URL = "https://stg.dhunjam.in/account/admin";

// Function to handle login  API call when user click on login button
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch Admin details from API endpoints
export const getAdminDetails = async (token, adminId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${adminId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update price of song charges
export const updatePrice = async (token, adminId, updatedAmounts) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/account/admin/${adminId}`,
      {
        amount: updatedAmounts,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  getAdminDetails,
  updatePrice,
};
