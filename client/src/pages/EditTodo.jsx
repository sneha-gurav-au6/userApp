import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import { connect } from "react-redux";
// import { addPro } from "../Redux/actions/productAction";
import { withRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
toast.configure();

// adding new product

class EditTodo extends Component {
    state = {
        name: "",
        address: "",
        birth_date: "",
        hobbies: [],
        other: false,
        other_hobbi: "",
        colleges: "",
        newcollo: "",
        gender: "",
    };
    //to set userid
    async componentDidMount() {
        if (localStorage) {
            const id = localStorage.getItem("jwtToken");
            this.setState({ token: id });
        }
        const api = await axios.get(
            "http://universities.hipolabs.com/search?name=middle"
        );

        this.setState({ colleges: api.data });
        console.log(this.state.colleges);
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "other") {
            this.setState({ other: !this.state.other });
        }

        this.setState({ [name]: value });
        console.log(this.state.other_hobbi);
        let newState = this.state;
        if (
            event.target.type === "checkbox" &&
            event.target.name !== "other_hobbi"
        ) {
            newState.hobbies.push(name);
        }
        // if (event.target.name === "other_hobbi") {
        //     const newhobbi = this.state.other_hobbi;
        //     console.log(newhobbi);
        //     newState.hobbies.push(this.state.other_hobbi);
        // }
        this.setState({ newState });

        // console.log(name, value);
    };

    handleFormData = async (e) => {
        e.preventDefault();
        console.log(this.state.other_hobbi);
        const newhobbi = this.state.other_hobbi;
        const newState = this.state;
        newState.hobbies.push(newhobbi);
        this.setState({ newState });
        const formData = {
            name: this.state.name,
            address: this.state.address,
            birth_date: this.state.birth_date,
            hobbies: this.state.hobbies,
            college: this.state.newcollo,
            gender: this.state.gender,
        };
        console.log(formData);
        const id = this.props.history.location.store;
        console.log(id);
        const datas = await axios.post(`/editProfile/${id}`, formData);
        console.log(datas.data);
        if (datas.status === 200) {
            toast.success("Updated Successfully!", {
                position: toast.POSITION.TOP_CENTER,
            });
            this.props.history.push("/all-todo");
        }
    };

    render() {
        console.log(this.props.user);
        return (
            <div className="container-fluid w-50">
                <form onSubmit={this.handleFormData}>
                    <div className="form-group ">
                        <h4>Update Profile</h4>
                        {/* add title */}
                        <label for="exampleInputEmail1"> Name</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="name"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Name"
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">address</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="address"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    {/* 
add prority */}
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">
                            birth_date
                        </label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="birth_date"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="pri"
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">gender</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="gender"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="pri"
                        />
                    </div>

                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="reading"
                                onChange={this.handleChange}
                                defaultChecked={false}
                            />
                            Reading
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="gaming"
                                onChange={this.handleChange}
                                defaultChecked={false}
                            />
                            Gaming
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="travelling"
                                onChange={this.handleChange}
                                defaultChecked={false}
                            />
                            Travelling
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="drawing"
                                onChange={this.handleChange}
                                defaultChecked={false}
                            />
                            Drawing
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="other"
                                onClick={this.handleChange}
                                defaultChecked={false}
                            />
                            Other
                        </label>
                    </div>
                    {this.state.other === "on" ? (
                        <div>
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1">
                                    Enter your hobbi
                                </label>
                                <input
                                    onChange={this.handleChange}
                                    type="text"
                                    name="other_hobbi"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>
                    ) : (
                        ""
                    )}

                    <div className="form-group">
                        {this.state.colleges !== "" ? (
                            <div>
                                <select
                                    className="form-control wC"
                                    name="newcollo"
                                    onChange={this.handleChange}
                                >
                                    {this.state.colleges.map((x, y) => (
                                        <option key={y} value={x.name}>
                                            {x.name}
                                        </option>
                                    ))}
                                </select>
                                ;
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(withRouter(EditTodo));
