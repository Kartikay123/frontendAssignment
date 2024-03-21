import React, { useState, useEffect ,useContext} from "react";
import { Link,useNavigate } from "react-router-dom";
import "./header.css";
import Logo from "../../assets/mylogo.jpg";
import { IoCloseCircleOutline } from "react-icons/io5";
// import { useAuth } from "../Context/authContext";
import { LoginContext } from "../Context/LoginContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDialog, setShowDialog] = useState(false); // State to control dialog visibility
  // const { currentUser, logout } = useAuth(); // Destructuring currentUser and logout from useAuth
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const navigate= useNavigate();


  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleContactClick = () => {
    setShowDialog(true); // Show dialog box when "Contact" is clicked
  };

  const handleCloseDialog = () => {
    setShowDialog(false); // Close dialog box
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.log("Error logging out :", error);
    }
  };

  return (
    <header className={`header ${isOpen ? "open" : ""}`}>
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="Logo" className="logo-img" />
        </Link>
      </div>
      {isLoaded && (
        <div className="animated-text">
          <span className="text">
            <h3>
              Transforming Radiology with AI: Pioneering Precision Medicine
            </h3>
          </span>
        </div>
      )}
      <nav className={`navigation ${isOpen ? "open" : ""}`}>
        <ul className={`nav-list ${isOpen ? "open" : ""}`}>
          <div className="dash-cont">
            <li>
              <Link
                to="/dashboard"
                className={`nav-link ${isOpen ? "open" : ""}`}
              >
                DashBoard
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className={`nav-link ${isOpen ? "open" : ""}`}
                onClick={handleContactClick}
              >
                Contact
              </Link>
            </li>
            {/* Conditionally render Register or Logout button */}
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="nav-link logout-link">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="nav-link register-link">
                  Login
                </Link>
              )}
            </li>
          </div>
        </ul>
      </nav>
      <div className="mobile-menu-icon" onClick={handleToggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      {/* Dialog Box */}
      {showDialog && (
        <div className="dialog-container">
          <div className="dialog">
            <IoCloseCircleOutline
              className="close-btn"
              onClick={handleCloseDialog}
            />
            <p>Phone: 07276060080</p>
            <p>Customer Support: support@deeptek.ai</p>
            <p>
              Address: 3rd Floor, Ideas to Impact Building, Pallod Farms, Behind
              Vijay Sales, Baner, Pune 411 045, Maharashtra
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
