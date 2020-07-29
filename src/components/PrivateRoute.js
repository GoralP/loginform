import React from "react";
import { Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
// let accessToken = localStorage.getItem("token");

const PrivateRoute = ({ component: Component, path }) => {
  const accessToken = localStorage.getItem("token");
  return (
    <Route
      path={path}
      render={(props) =>
        accessToken ? <Component {...props} /> : <Redirect to="/" />
      }
    ></Route>
  );
};

export default PrivateRoute;
