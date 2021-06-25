import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../store";
import { Redirect } from "react-router-dom";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name } = props;
  let displayName;
  if (name === "login") {
    displayName = "Login";
  } else if (name === "signup") {
    displayName = "Sign Up";
  }

  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    if (name === "signup") {
      const email = evt.target.email.value;
      dispatch(authenticate({ username, password, formName, email }));
    } else {
      dispatch(authenticate({ username, password, formName }));
    }
  };
  const isLoggedIn = useSelector((state) => !!state.auth.id);

  return (
    <div>
      {isLoggedIn ? (
        <Redirect to="/home" />
      ) : (<div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" />
          </div>
          {name === "signup" ? (
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
                <input name="email" type="email" />
            </div>
          ) : (
            <div></div>
          )}
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
          </form>
          {name === 'signup' ? (<div>
            <a href="/auth/google">
            <button type='button'>Create an account with Google</button>
            </a>
            <footer>If you create an account with Google, your username will be your first name and your password your last!</footer></div>
          ):(<div></div>)}
        </div>
      )}
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
// const mapLogin = (state) => {
//   return {
//     name: "login",
//     displayName: "Login",
//     error: state.auth.error,
//   };
// };

// const mapSignup = (state) => {
//   return {
//     name: "signup",
//     displayName: "Sign Up",
//     error: state.auth.error,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault();
//       const formName = evt.target.name;
//       const username = evt.target.username.value;
//       const password = evt.target.password.value;
//       dispatch(authenticate(username, password, formName));
//     },
//   };
// };

// export const Login = connect(mapLogin, mapDispatch)(AuthForm);
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

export default AuthForm;
