import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { USER_LOGOUT_SUCCESS } from "../store/actions/authActions";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FcMenu } from "react-icons/fc";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { token } = useSelector((store) => store.authReducer);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch({ type: USER_LOGOUT_SUCCESS });
  };

  return (
    <header className="header active">
      <div className="container">
        <Link to="/" className="logo">
          Fleeto
        </Link>

        <nav className={`navbar ${isMobileMenuOpen ? "active" : ""}`}>
          <div className="wrapper">
            <Link to="/" className="logo">
              Fleeto
            </Link>
            <button className="nav-close-btn">
              {" "}
              <AiOutlineCloseCircle onClick={toggleMobileMenu} />{" "}
            </button>
          </div>
          <ul className={`navbar-list ${isMobileMenuOpen ? "active" : ""}`}>
            <li className="nav-item">
              <Link to="/items" className="navbar-link">
                Items
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="navbar-link">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/delivery-vehicles" className="navbar-link">
                Delivery Vehicles
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/customers" className="navbar-link">
                Customers
              </Link>
            </li>
            <li
              as={"button"}
              className={`${isMobileMenuOpen ? "nav-item" : "btn-outline"}`}
            >
              {token != null ? (
                <button
                  onClick={handleLogOut}
                  style={{ color: isMobileMenuOpen ? "white" : "" }}
                >
                  Log Out
                </button>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </nav>

        <div
          className={`nav-open-btn ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
        >
          <FcMenu />
        </div>

        <div className={`overlay ${isMobileMenuOpen ? "active" : ""}`}></div>
      </div>
    </header>
  );
};

export default Navbar;
