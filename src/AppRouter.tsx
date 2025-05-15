import "./services/axiosConfig.js";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainWaiter from "./pages/MainWaiter/MainWaiter.tsx";
import MenuWaiter from "./pages/MenuWaiter";
import DishesWaiter from "./pages/DishesWaiter";
import Confirmation from "./pages/Confirmation/Confirmation.tsx";
import PickUp from "./pages/PickUp";
import { DishProvider } from "./pages/DishContext";
import Login from "./pages/Login/Login.tsx";
import Report from "./pages/Report";
import Register from "./pages/Register/Register.tsx";
import ProtectedRoute from "./components/protect-routes/ProtectedRoute";

const AppRouter: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <DishProvider>
      <Router>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/" element={isAuthenticated ? <Navigate to="/Home" /> : <Login />} />
          <Route
            path="/Home"
            element={
              <ProtectedRoute>
                <MainWaiter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/MenuWaiter/:table"
            element={
              <ProtectedRoute>
                <MenuWaiter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/DishesWaiter/:table?/:id"
            element={
              <ProtectedRoute>
                <DishesWaiter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Confirmation/:table?/:id?"
            element={
              <ProtectedRoute>
                <Confirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PickUp"
            element={
              <ProtectedRoute>
                <PickUp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Report"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </Router>
    </DishProvider>
  );
};

export default AppRouter;
