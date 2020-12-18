import React, { Component } from "react";
import "./style/home.css";
import { Redirect, withRouter, Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userAction";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
toast.configure();

class Home extends Component {
    state = {
        task: "",
        user: "",
        showCollapsedMenu: false,
        token: null,
    };

    //redirecting to create new user i.e register
    userSubmit = (e) => {
        e.preventDefault();
        if (this.props.user.isAuthenticated !== true) {
            this.props.history.push({ pathname: "/register" });
        }
    };

    //user logout function
    handleLogout = async (e) => {
        e.preventDefault();
        //dispatchng data
        this.props.logoutUser();
        toast.success("Logout Successfully!", {
            position: toast.POSITION.TOP_CENTER,
        });
    };
    toggleMenu = () => {
        this.setState({
            showCollapsedMenu: !this.state.showCollapsedMenu,
        });
    };
    alluser = async (e) => {
        e.preventDefault();

        if (this.props.user.isAuthenticated !== true) {
            this.props.history.push({ pathname: "/register" });
        } else {
            this.props.history.push({ pathname: "/all-user" });
        }
    };
    render() {
        console.log(this.props.user);
        console.log(this.props.user.user.id);
        const show1 = this.state.showCollapsedMenu ? "show" : null;
        const logout = (
            <li class="btn btn-warning mr-sm-2">
                <button
                    className="btn btn-primary "
                    onClick={this.handleLogout}
                >
                    Logout
                </button>
            </li>
        );
        //register-login links
        const registerLogin = (
            <>
                <li class="btn btn-warning mr-sm-2">
                    <Link
                        class="nav-link"
                        to="/register"
                        style={{
                            fontWeight: "bolder",
                        }}
                    >
                        Register
                        <span class="sr-only">(current)</span>
                    </Link>
                </li>
                <li class="btn btn-warning mr-sm-2">
                    <Link
                        class="nav-link"
                        to="/login"
                        style={{
                            fontWeight: "bolder",
                        }}
                    >
                        Login
                        <span class="sr-only">(current)</span>
                    </Link>
                </li>
            </>
        );
        return (
            <div className="main">
                <div className="">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light ">
                        <b
                            class="navbar-brand"
                            style={{ fontWeight: "bolder" }}
                        >
                            Todo App
                        </b>
                        <button
                            className="navbar-toggler"
                            data-toggle="collapse"
                            data-target="#navbar-menu"
                            type="button"
                            aria-controls="navbarSupportedContent1"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={this.toggleMenu}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div
                            className={"collapse navbar-collapse " + show1}
                            id="navbarNav"
                        >
                            <ul class="navbar-nav  mr-auto">
                                <li class="nav-item active"></li>
                            </ul>
                            <ul className="navbar-nav">
                                {" "}
                                {/* if user is not authenticated show register-login else show logout */}
                                {this.props.user.isAuthenticated === false
                                    ? registerLogin
                                    : logout}
                            </ul>
                        </div>
                    </nav>
                </div>

                <div className="main2 ">
                    <h3 className="text">WanT To Create Todo??</h3>
                    <div className="main3 row">
                        <div className="col-3"></div>
                        <div className="leftPart col-3">
                            <button
                                className="btn btn-dark"
                                onClick={this.userSubmit}
                                style={{ color: "white" }}
                            >
                                Create Todo
                            </button>
                        </div>
                        <div className="rightPart col-3 ">
                            <button
                                className="btn btn-dark"
                                style={{ color: "white" }}
                                onClick={this.alluser}
                            >
                                Get All Todo
                            </button>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state,
    };
};

export default connect(mapStateToProps, { logoutUser })(withRouter(Home));
