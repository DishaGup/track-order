import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginRequest } from "../store/actions/authActions";
const initial = {
  name: "disha",
  password: "disha",
};

const LoginPage = () => {
  const [showpass1, setShowpass1] = useState(false);
  const [formData, setFormData] = useState(initial);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const { token, error, userId } = useSelector((store) => store.authReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(formData));
  };

  return (
    <div className="center">
      {token != null ? (
        <h2>Welcome</h2>
      ) : (
        <div className="login-container">
          <h2 className="login-heading">Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter Your name"
              />
            </div>
            <div className="form-control">
              <label className="form-label">Password</label>
              <div className="password-input">
                <input
                  name="password"
                  placeholder="Type Password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showpass1 ? "text" : "password"}
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowpass1((prev) => !prev)}
                >
                  {showpass1 ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              </div>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <p className="link-text">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
