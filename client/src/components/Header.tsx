import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";
import classes from "./Header.module.css";

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const logoutHandler = () => {
    dispatch(logout());

    // redirect to home page
    window.location.href = "/";
  };

  let { user } = useSelector((state: RootState) => state.auth);

  console.log(user);

  return (
    <header className={classes.header}>
      <Link to="/" className={classes.title}>
        Book App
      </Link>

      <div className={classes.links}>
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logoutHandler}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
