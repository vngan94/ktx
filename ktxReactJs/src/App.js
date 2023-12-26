import React from "react";
import "./css/App.css";

import HomePageAdmin from "./container/System/HomePageAdmin";

import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Redirect } from "react-router";
import LoginWebPage from "./container/Login/LoginWebPage";

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route exact path="/">
            <Redirect to={"/admin"} />
          </Route>
          <Route exact path="/admin">
            <HomePageAdmin />
          </Route>
          <Route
            path="/admin/"
            render={() => {
              if (
                JSON.parse(localStorage.getItem("userData")) &&
                JSON.parse(localStorage.getItem("userData")).roleId === "R1"
              ) {
                return <HomePageAdmin />;
              } else return <Redirect to={"/login"} />;
            }}
          ></Route>

          <Route path="/login">
            <LoginWebPage />
          </Route>

          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
