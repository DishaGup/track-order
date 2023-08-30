import React, { useState } from "react";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../store/actions/authActions";

const initialState = {
  name: "",
  password: "",
  phoneNumber: "",
  confirmpassword: "",
};

const RegisterPage = () => {
  const [showpass1, setShowpass1] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true); // New state for passwords match status

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPasswordsMatch(
      name === "password"
        ? value === formData.confirmpassword
        : formData.password === value
    );
  };

  const { loading, error } = useSelector((store) => store.authReducer);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerRequest(formData));

    setFormData(initialState);
  };

  return (
    <div className="center">
      <div className="registeration-container">
        <h2 className="login-heading">Create New Account</h2>
        {error != null && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter Your Name"
            />
          </div>

          <div className="form-control">
            <label className="form-label">Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter Your Phone Number"
              pattern="\d{10}"
              title="Please enter a 10-digit phone number"
            />
          </div>

          <div className="form-control">
            <label className="form-label">Password</label>
            <div className="password-input">
              <input
                type={showpass1 ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Type Strong Password"
              />
              <button
                className="password-toggle"
                onClick={() => setShowpass1((prev) => !prev)}
              >
                {showpass1 ? <AiFillEye /> : <AiFillEyeInvisible />}
              </button>
            </div>
          </div>

          <div className="form-control">
            <label className="form-label">Confirm Password</label>
            <div className="confirm-password-input">
              <input
                type="password"
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
                className="form-input"
                placeholder="Confirm Password"
              />
              <button
                className="confirm-password-toggle"
                disabled={!passwordsMatch} // Disable the button when passwords don't match
              >
                {passwordsMatch ? <FcCheckmark /> : <FcCancel />}
              </button>
            </div>
            {!passwordsMatch && ( // Display error message if passwords don't match
              <p className="error-message">Passwords do not match.</p>
            )}
          </div>
          <button
            type="submit"
            className="login-button"
            disabled={loading || !passwordsMatch} // Disable the button if passwords don't match
          >
            {loading ? "Submitting" : "Register"}
          </button>
          <p className="link-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
