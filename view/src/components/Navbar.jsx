import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { USER_LOGOUT_SUCCESS } from '../store/actions/authActions';


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const {token} =useSelector((store)=>store.authReducer)
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };
const dispatch=useDispatch()

const handleLogOut=()=>{
 dispatch({type:USER_LOGOUT_SUCCESS})
}


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Your Logo
        </Link>
        <div className={`mobile-menu-icon ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/items" className="nav-links">
              Items
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/orders" className="nav-links">
              Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/delivery-vehicles" className="nav-links">
              Delivery Vehicles
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/customers" className="nav-links">
              Customers
            </Link>
          </li>
         <button>
         <li className="nav-item">
         {
          token != null ? (
            <button onClick={handleLogOut} >Log Out</button>
          ) :(   <Link to="/" className="nav-links">
          Login
         </Link>)
         }
          </li>
         </button>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
