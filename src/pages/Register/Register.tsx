import React from "react";
import "./Register.css";

const Register: React.FC = () => {
  return (
    <section id="register-container">
      <div id="form-container">
        <div id="image-container">
          <img src="../../../public/img/user-icon.svg" alt="" />
        </div>

        <div id="register-form">
          <div className="form-section">
            <label>Name</label>
            <input placeholder="Enter your name"></input>
          </div>

          <div className="form-section">
            <label>Password</label>
            <input placeholder="Enter your password"></input>
          </div>

          <div className="form-section">
            <label>Restaurant</label>
            <select defaultValue="">
              <option value="" disabled>
                Select the restaurant
              </option>
            </select>
          </div>
        </div>

        <div id="button-container">
          <button>Login</button>
        </div>
      </div>
    </section>
  );
};

export default Register;
