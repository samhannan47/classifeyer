import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import AuthForm from "./components/AuthForm";
import Welcome from "./components/Welcome";
import Main from "./components/Main";

/**
 * COMPONENT
 */
const Routes = () => {
  const dispatch = useDispatch();

  const loadInitialData = () => {
    dispatch(me());
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <AuthForm name="login" />
        </Route>
        <Route path="/signup">
          <AuthForm name="signup" />
        </Route>
        <Route path="/train">
          <Main />
        </Route>
      </Switch>
    </div>
  );
};

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
//     // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
//     isLoggedIn: !!state.auth.id,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData() {
//       dispatch(me());
//     },
//   };
// };

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes);
