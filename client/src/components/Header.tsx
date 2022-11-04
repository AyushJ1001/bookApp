import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const logoutHandler = () => {
    dispatch(logout());
  };

  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user);
  return (
    <header>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          fontWeight: "bold",
          fontFamily: "fantasy",
          fontSize: "1.1rem",
        }}
      >
        Book App
      </Link>

      <div className="links">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <button onClick={logoutHandler}>Logout</button>
        )}
      </div>
    </header>
  );
}

export default Header;
