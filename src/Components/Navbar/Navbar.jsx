// Importing necessary dependencies and styles
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../Contexts/AuthContext"; // Import the useAuth hook
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Navbar component to display navigation links
function Navbar() {
  // Accessing authentication-related functions and data from the useAuth hook
  const { currentUser, signOutFunc } = useAuth(); 
  // Hook to navigate between pages
  const navigate = useNavigate();

  // Function to handle user signout
  const handleSignOut = async () => {
    try {
      // Sign out the user
      await signOutFunc();
      // Redirect to the home page or any other page after signout
      navigate('/');
      // Show a success toast
      toast.success('Sign Out Successful');
    } catch (error) {
      // Show an error toast in case of signout failure
      toast.error('Sign Out Error');
    }
  };

  // Rendering the Navbar component
  return (
    <>
      <div className="navbar-container">
        <div className="navbar">
          <div className="app-name">
            {/* Application title */}
            <span className="app-title">Buy Busy</span>
          </div>
          <div className="nav-links">
            {currentUser ? (
              // If user is signed in, show these options
              <>
                <NavLink to={"/"} className="nav-link">
                  {/* Home link */}
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/5974/5974636.png"
                    alt="Home Icon"
                    className="nav-icon"
                  />
                  Home
                </NavLink>
                <NavLink to={`/users/${currentUser.uid}/orders`} className="nav-link">
                  {/* Orders link */}
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/6815/6815043.png"
                    alt="Orders Icon"
                    className="nav-icon"
                  />
                  Orders
                </NavLink>
                <NavLink to={`/users/${currentUser.uid}/myCart`} className="nav-link">
                  {/* Cart link */}
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/6815/6815043.png"
                    alt="Cart Icon"
                    className="nav-icon"
                  />
                  Cart
                </NavLink>
                <button className="nav-link signoutbtn" onClick={handleSignOut}>
                  {/* Logout button */}
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/4400/4400828.png"
                    alt="Logout Icon"
                    className="nav-icon"
                  />
                  Logout
                </button>
              </>
            ) : (
              // If user is not signed in, show these options
              <>
                <NavLink to={"/"} className="nav-link">
                  {/* Home link */}
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/5974/5974636.png"
                    alt="Home Icon"
                    className="nav-icon"
                  />
                  Home
                </NavLink>
                <NavLink to={"/signin"} className="nav-link">
                  {/* Sign In link */}
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/1646/1646779.png"
                    alt="Sign In Icon"
                    className="nav-icon"
                  />
                  Sign In
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Outlet for rendering nested routes */}
      <Outlet />
    </>
  );
}

// Exporting the Navbar component
export default Navbar;
