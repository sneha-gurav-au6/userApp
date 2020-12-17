import React, { Component } from "react";
import axios from "axios";

import { connect } from "react-redux";
// import { addPro } from "../Redux/actions/productAction";
import { withRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
toast.configure();

// adding new product

class CreateTodo extends Component {
    state = {
        name: "",
        description: "",
        proprity_of_task: "",
    };
    //to set userid
    componentDidMount() {
        if (localStorage) {
            const id = localStorage.getItem("jwtToken");
            this.setState({ token: id });
        }
    }

    //getting input from form

    //fetching api and sending data to route

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    handleFormData = async (e) => {
        e.preventDefault();
        const formData = {
            name: this.state.name,
            description: this.state.description,
            priority_of_task: this.state.priority_of_task,
        };
        console.log(formData);
        const datas = await axios.post("/createNewTask", formData);
        if (datas.status === 200) {
            alert("Uploaded Successfully");
            this.props.history.push("/");
        }
    };

    render() {
        return (
            <div className="container-fluid w-50">
                <form onSubmit={this.handleFormData}>
                    <div className="form-group ">
                        {/* add title */}
                        <h4>Create New Todo</h4>
                        <label for="exampleInputEmail1">Add task name</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="name"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">
                            Task-Description
                        </label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="description"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            required
                        />
                    </div>
                    {/* 
add prority */}
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">
                            priority_of_task
                        </label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="priority_of_task"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="pri"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default CreateTodo;
