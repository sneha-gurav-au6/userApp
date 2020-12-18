import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import { connect } from "react-redux";
// import { addPro } from "../Redux/actions/productAction";
import { withRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
toast.configure();

//user update

class EditUser extends Component {
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
            //set token from local storage
            const id = localStorage.getItem("jwtToken");
            this.setState({ token: id });
        }
        //fetching college api by axios
        const api = await axios.get(
            "http://universities.hipolabs.com/search?name=middle"
        );
        //set college api data in state
        this.setState({ colleges: api.data });
    }

    handleChange = (event) => {
        //get name and value from user input
        const { name, value } = event.target;
        //set all user input value to respective state
        this.setState({ [name]: value });
        //check if user is clicked for other hobbie and change thastate
        if (name === "other") {
            this.setState({ other: !this.state.other });
        }

        //pushing all hobies in hobbies state except other hobbi
        let newState = this.state;
        if (
            event.target.type === "checkbox" &&
            event.target.name !== "other_hobbi"
        ) {
            newState.hobbies.push(name);
        }
        //set new object in orinal state
        this.setState({ newState });
    };

    //function runs when submit is clicked
    handleFormData = async (e) => {
        e.preventDefault();
        //pushing other hobbie in hobbies array
        const newhobbi = this.state.other_hobbi;
        const newState = this.state;
        newState.hobbies.push(newhobbi);
        //set state for hobbies
        this.setState({ newState });

        //creating new object with new values
        const formData = {
            name: this.state.name,
            address: this.state.address,
            birth_date: this.state.birth_date,
            hobbies: this.state.hobbies,
            college: this.state.newcollo,
            gender: this.state.gender,
        };
        //getting particular user id for that need to change
        const id = this.props.history.location.store;
        //calling edit profile route and submittig new values
        const datas = await axios.post(`/editProfile/${id}`, formData);
        //display succsess msg if no error
        if (datas.status === 200) {
            toast.success("Updated Successfully!", {
                position: toast.POSITION.TOP_CENTER,
            });
            this.props.history.push("/all-user");
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
                    {/* add address */}
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
add birth date */}
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
                    {/* add gender */}
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
                    {/* add hobbies */}
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
                    {/* add college name from list of collgeges */}
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
export default connect(mapStateToProps)(withRouter(EditUser));
