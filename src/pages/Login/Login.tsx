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
    <section id="login-page">
      <form id="login-form-wrapper" onSubmit={handleSubmit}>
        <div className="login-avatar">
          <img src="../../../public/img/user-icon.svg" alt="User Icon" />
        </div>

        <div id="login-fields">
          <div className="login-input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="login-input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {error && <p className="login-error">{error}</p>}

        <div id="login-register-link">
          <a href="/Register">Go to register</a>
        </div>

        <div id="login-submit-button">
          <button type="submit">Login</button>
        </div>
      </form>
    </section>
  );
};

export default Login;
