import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./redux/actions/setAuthToken";
import { setCurrentUser } from "./redux/actions/userAction";

import { connect } from "react-redux";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import CreateTodo from "./pages/CreateTodo";
import EditTodo from "./pages/EditTodo";
import AllTask from "./pages/AllTask";
import "./App.css";

class App extends Component {
    componentDidMount() {
        // Check for token
        if (localStorage.jwtToken) {
            // Set token to Auth header
            setAuthToken(localStorage.jwtToken);
            // Decode jwt token
            const decode = jwt_decode(localStorage.jwtToken);
            // Set user and isAuthenticated
            this.props.setCurrentUser(decode);
        }
    }
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/create-todo" component={CreateTodo} />
                    <Route exact path="/update-todo" component={EditTodo} />
                    <Route exact path="/all-todo" component={AllTask} />
                </Switch>
            </div>
        );
    }
}

export default connect(null, { setCurrentUser, setAuthToken })(App);
