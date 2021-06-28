import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleLogout } from "../store";
import history from "../history";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.username);
  const handleClick = () => {
    window.location = "/";
    dispatch(handleLogout());
  };

  return (
    <div id="navbar">
      <h1 className="title">
        <img id="logo" src="/CLASSIFEYER.png" />
      </h1>
      <nav>
        {isLoggedIn ? (
          <span id="logged-in">
            {/* The navbar will show these links after you log in */}
            <span>Logged in as {name}</span>
            <button type="button" onClick={handleClick}>
              Logout
            </button>
          </span>
        ) : (
          <span id="login">
            {/* The navbar will show these links before you log in */}
            <button type="button" onClick={() => (window.location = "/login")}>
              Login
            </button>
            <button type="button" onClick={() => (window.location = "/signup")}>
              Sign Up
            </button>
          </span>
        )}
        <span id="products">
          <button type="button" onClick={() => (window.location = "/train")}>
            Classifeye here!
          </button>
          <button type="button" onClick={() => (window.location = "/account")}>
            My Account
          </button>
        </span>
      </nav>
    </div>
  );
};

export default Navbar;
