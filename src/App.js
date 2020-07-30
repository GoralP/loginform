import React from "react";
import Home from "./view/Home";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Dashboard } from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PrivateRoute } from "./components";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
        </Switch>
      </Router>
      <ToastContainer></ToastContainer>
    </Provider>
  );
};

export default App;
