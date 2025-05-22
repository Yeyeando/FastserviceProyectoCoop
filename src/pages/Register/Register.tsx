import React, { useState, useEffect } from "react";
import "./Register.css";
import { register } from "../../services/authService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch(() => setError("Error al cargar los restaurantes"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register({
        username,
        password,
        restaurantId: Number(restaurantId),
      });
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data || "Error al registrar");
    }
  };

  return (
    <section id="register-page">
      <form id="register-form-wrapper" onSubmit={handleSubmit}>
        <div id="register-avatar">
          <img src="../../../public/img/user-icon.svg" alt="User Icon" />
        </div>

        <div id="register-fields">
          <div className="register-input-group">
            <label>Name</label>
            <input
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="register-input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="register-input-group">
            <label>Restaurant</label>
            <select
              value={restaurantId}
              onChange={(e) => setRestaurantId(e.target.value)}
              required
            >
              <option value="" disabled>
                Select the restaurant
              </option>
              {restaurants.map((restaurant: any) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="register-error">{error}</p>}

        <div id="register-login-link">
          <a href="/">Go to login</a>
        </div>

        <div id="register-submit-button">
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
};

export default Register;
