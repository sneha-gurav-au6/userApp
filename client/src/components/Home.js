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

    //redirecting to create new todo
    todoSubmit = (e) => {
        e.preventDefault();
        if (this.props.user.isAuthenticated !== true) {
            this.props.history.push({ pathname: "/register" });
        } else {
            this.props.history.push({ pathname: "/create-todo" });
        }
    };
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
    alltodo = async (e) => {
        e.preventDefault();

        if (this.props.user.isAuthenticated !== true) {
            this.props.history.push({ pathname: "/register" });
        } else {
            this.props.history.push({ pathname: "/all-todo" });
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

                        {/* <div
                            class="collapse navbar-collapse"
                            id="navbarNavAltMarkup"
                        >
                            <div className="navbar-nav mr-0 my-2 my-lg-0">
                                {this.props.user.isAuthenticated !== false ? (
                                    <div className="logout">
                                       
                                    </div>
                                ) : (
                                    <div className="register">
                                        <div>
                                            <ul className="navbar-nav mr-0 my-2 my-lg-0">
                                                
                                            </ul>
                                        </div>
                                        <div className="login"></div>
                                    </div>
                                )}

                              
                            </div>
                        </div> */}
                        <div
                            className={"collapse navbar-collapse " + show1}
                            id="navbarNav"
                        >
                            {/* <div
                                className="collapse navbar-collapse"
                                id="navbar-menu"
                            ></div> */}
                            <ul class="navbar-nav  mr-auto">
                                <li class="nav-item active"></li>
                            </ul>
                            <ul className="navbar-nav">
                                {" "}
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
                                onClick={this.todoSubmit}
                                style={{ color: "white" }}
                            >
                                Create Todo
                            </button>
                        </div>
                        <div className="rightPart col-3 ">
                            <button
                                className="btn btn-dark"
                                style={{ color: "white" }}
                                onClick={this.alltodo}
                            >
                                Get All Todo
                            </button>
                        </div>
                        <div className="col-3"></div>
                    </div>

                    {/* <div className="rightPart col-8">
                        <div className="">
                            {this.state.task === "" ? (
                                <div></div>
                            ) : (
                                <div>
                                    {this.state.task.map((p) => (
                                        <div class="card">
                                            <div class="card-header">
                                                Priority To Task :
                                                {p.priority_of_task}
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-title">
                                                    {p.name}
                                                </h5>
                                                <p class="card-text">
                                                    {p.description}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className="btn btn-danger firstbutton"
                                                id={p._id}
                                                onClick={this.handlechange}
                                            >
                                                Delet Task
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger secondbutton"
                                                id={p._id}
                                                onClick={this.handleUpdate}
                                            >
                                                Update Task
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div> */}
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
