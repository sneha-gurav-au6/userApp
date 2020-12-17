import React, { Component } from "react";
import { RegisterUsers } from "../redux/actions/userAction";
import { connect } from "react-redux";

import "./style/register.css";
import classnames from "classnames";

//user register route
class Register extends Component {
    state = {
        name: "",
        email: "",
        password: "",
    };

    //getting input from form
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    //submit input form detils
    handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        };
        const data = {
            newUser: newUser,
        };

        const rgs = this.props.RegisterUsers(data);
        console.log(rgs);
    };

    handlelogin = (e) => {
        this.props.history.push("/login");
    };
    // redirecting to login page
    componentWillReceiveProps(nextprops) {
        console.log(nextprops);
        if (nextprops.auth.RegisterUser._id) {
            this.props.history.push("/login");
        }
    }

    render() {
        const { errors } = this.props.auth;
        console.log(this.props.auth.errors.message);
        return (
            <div className="container-fluid main">
                {/* google login */}
                <div className="row mt-2">
                    <div className="col-md-2"></div>

                    {/* register form */}
                    <div className="col-md-5 text1">
                        <h2>Register Here</h2>
                        {/* enter username */}
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group form-group-sm">
                                <label for="exampleInputPassword1">
                                    User Name
                                </label>
                                <input
                                    onChange={this.handleChange}
                                    type="text"
                                    className={classnames(
                                        "form-control input-sm ",
                                        {
                                            "is-invalid": errors.name,
                                        }
                                    )}
                                    name="name"
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            {/* enter email address */}
                            <div className="form-group">
                                <label for="exampleInputEmail1">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className={classnames("form-control ", {
                                        "is-invalid": errors.email,
                                    })}
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    onChange={this.handleChange}
                                    name="email"
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                )}
                                <small
                                    id="emailHelp"
                                    className="form-text text-muted"
                                >
                                    We'll never share your email with anyone
                                    else.
                                </small>
                            </div>

                            {/* enetr password */}
                            <div className="form-group">
                                <label for="exampleInputPassword1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className={classnames("form-control ", {
                                        "is-invalid": errors.password,
                                    })}
                                    id="exampleInputPassword1"
                                    onChange={this.handleChange}
                                    name="password"
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                            <div>
                                {errors.message && (
                                    <div className="invalid-feedback">
                                        {errors.message}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className={classnames(
                                        "btn btn-warning form-control",
                                        {
                                            "is-invalid": errors.message,
                                        }
                                    )}
                                >
                                    Submit
                                </button>
                                <h6>Already registered ?? Please login..</h6>
                                <button
                                    onClick={this.handlelogin}
                                    className="btn btn-primary"
                                >
                                    <a style={{ color: "white" }}>Login</a>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        );
    }
}

const mapstateToProps = (state) => {
    return { auth: state };
};

export default connect(mapstateToProps, { RegisterUsers })(Register);
