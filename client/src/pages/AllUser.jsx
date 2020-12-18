import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import "./todo.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
toast.configure();

//displaying all user list with details
class AllUser extends Component {
    state = {
        users: "",
    };

    //calling all user list route
    async componentDidMount() {
        const user = await axios.get("/getalluser");
        //seting user list in state
        this.setState({ users: user.data });
    }
    //redirecting to update todo
    handleUpdate = (e) => {
        //getting id for which update is clicked
        const id = e.target.id;

        e.preventDefault();
        //sending user id to update profile component
        this.props.history.push({ pathname: "/update-profile", store: id });
    };

    //deleting particular user
    handlechange = async (e) => {
        e.preventDefault();
        //getting id for which delet is clicked
        const id1 = e.target.id;

        const datas = await axios.post(`/deletProfile/${id1}`);
        //display msg if user deleted
        if (datas.status === 200) {
            toast.success("Deleted Succefully!", {
                position: toast.POSITION.TOP_CENTER,
            });
            this.props.history.push("/");
        }
    };
    render() {
        console.log(this.props.user);
        return (
            <div className="main">
                <div>
                    {/* if user list is empty show no data found or still loads else show user list */}
                    {this.state.users ? (
                        <div className="row">
                            {this.state.users.map((p) => (
                                <div className="col-md-3 ">
                                    <div
                                        className="card"
                                        style={{ width: "18rem" }}
                                    >
                                        <div className="card-body">
                                            <h3 className="card-title">
                                                {p.name}
                                            </h3>
                                            <h6 className="card-subtitle mb-2 text-muted">
                                                Birth_Date:
                                                {p.birth_date}
                                            </h6>
                                            <h6 className="card-subtitle mb-2 text-muted">
                                                Gender:
                                                {p.gender}
                                            </h6>
                                            <h6 className="card-subtitle mb-2 text-muted">
                                                College Name :{p.college}
                                            </h6>

                                            <dl>
                                                <dt>Hobbies</dt>
                                                <dd>{p.hobbies.join(",")}</dd>
                                            </dl>

                                            <p className="card-text">
                                                {p.address}
                                            </p>

                                            <button
                                                type="button"
                                                className="btn btn-danger card-link"
                                                id={p._id}
                                                onClick={this.handlechange}
                                            >
                                                Delet User
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger card-link"
                                                id={p._id}
                                                onClick={this.handleUpdate}
                                            >
                                                Update User
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>Loading</div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.todo,
    };
};
export default connect(mapStateToProps)(withRouter(AllUser));
