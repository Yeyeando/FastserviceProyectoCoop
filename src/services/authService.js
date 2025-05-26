import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const login = async ({ username, password }) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });

  const { token, userId } = response.data;

  if (token) {
    localStorage.setItem("userToken", token);
  }

  if (userId) {
    localStorage.setItem("userId", userId); // ✅ Guardamos el userId
  }

  return response.data;
};

// Cierra la sesión (elimina el token)
export const logout = () => {
  localStorage.removeItem("userToken");
};

export const register = async ({ username, password, restaurantId }) => {
  const response = await axios.post("http://localhost:8080/auth/register", {
    username,
    password,
    restaurantId,
  });
  return response.data;
};

// Recupera el token actual
export const getCurrentToken = () => {
  return localStorage.getItem("userToken");
};
