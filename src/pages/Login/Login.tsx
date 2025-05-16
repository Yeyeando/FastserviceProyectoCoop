import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import "./Login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ username, password });
      navigate("/home");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <section id="login-container">
      <form id="form-container" onSubmit={handleSubmit}>
        <div className="login-image-container">
          <img src="../../../public/img/user-icon.svg" alt="User Icon" />
        </div>

        <div id="login-form">
          <div className="form-section">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-section">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <div id="register-option">
          <a href="/Register">I don't have an account.</a>
        </div>

        <div id="login-button-container">
          <button type="submit">Login</button>
        </div>
      </form>
    </section>
  );
};

export default Login;
