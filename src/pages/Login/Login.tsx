import React from "react";
import "./Login.css"
const Login: React.FC = () => {
  return (

    <section id="login-container">


        <div id="image-container">
          <img src="../../../public/img/user-icon.svg" alt="" />
        </div>

        <div id="login-form">
          <div className="form-section">
              <label>Name</label>
              <input placeholder="Enter your name"></input>
          </div>

          <div className="form-section">
              <label>Password</label>
              <input placeholder="Enter your password"></input>
          </div>
        </div>

        <div id="button-container">
          <button>
            Login
          </button>
        </div>

    </section>

  );
};

export default Login;
