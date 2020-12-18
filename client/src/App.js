import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./redux/actions/setAuthToken";
import { setCurrentUser } from "./redux/actions/userAction";

import { connect } from "react-redux";
import "./App.css";

//importing register from componenent
import Register from "./components/Register";
//importing login from componenent
import Login from "./components/Login";

//importing home from componenent
import Home from "./components/Home";

//importing edituser from componenent

import EditUser from "./pages/EditUser";

//importing all user from componenent
import AllUser from "./pages/AllUser";

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
                    {/* login route */}
                    <Route exact path="/login" component={Login} />

                    {/* register route */}
                    <Route exact path="/register" component={Register} />

                    {/* home route */}
                    <Route exact path="/" component={Home} />

                    {/* edit profile route */}
                    <Route exact path="/update-profile" component={EditUser} />

                    {/* get all user list route */}
                    <Route exact path="/all-user" component={AllUser} />
                </Switch>
            </div>
        );
    }
}

export default connect(null, { setCurrentUser, setAuthToken })(App);
