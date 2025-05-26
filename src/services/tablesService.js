import axios from "axios";

const BASE_URL = "http://localhost:8080/tables/my-restaurant";
const getUserId = () => localStorage.getItem("userId");

// Obtener todas las mesas
export const getAllTables = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?userId=${getUserId()}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo las mesas:", error);
    throw error;
  }
};

// Obtener una mesa por ID
export const getTableById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}?userId=${getUserId()}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo la mesa con id ${id}:`, error);
    throw error;
  }
};

// Crear una nueva mesa
export const createTable = async (tableData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}?userId=${getUserId()}`,
      tableData
    );
    return response.data;
  } catch (error) {
    console.error("Error creando la mesa:", error);
    throw error;
  }
};

// Actualizar una mesa por ID
export const updateTable = async (id, tableData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${id}?userId=${getUserId()}`,
      tableData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizando la mesa con id ${id}:`, error);
    throw error;
  }
};

// Actualizar la disponibilidad de una mesa
export const updateTableAvailability = async (id, availability) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${id}/availability?userId=${getUserId()}`,
      availability,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error actualizando la disponibilidad de la mesa con id ${id}:`,
      error
    );
    throw error;
  }
};
