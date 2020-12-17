import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import "./todo.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
toast.configure();

class AllTask extends Component {
    state = {
        users: "",
    };
    async componentDidMount() {
        const user = await axios.get("/getalluser");
        console.log(user.data);
        this.setState({ users: user.data });
    }
    //redirecting to update todo
    handleUpdate = (e) => {
        const id = e.target.id;
        console.log(id);
        e.preventDefault();
        this.props.history.push({ pathname: "/update-todo", store: id });
    };

    //deleting particular todo
    handlechange = async (e) => {
        e.preventDefault();
        const id1 = e.target.id;

        const datas = await axios.post(`/deletProfile/${id1}`);

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

                                            {/* <p className="card-text">
                                                {p.hobbies}
                                            </p> */}
                                            <p className="card-text">
                                                {p.address}
                                            </p>
                                            <button
                                                type="button"
                                                className="btn btn-danger card-link"
                                                id={p._id}
                                                onClick={this.handlechange}
                                            >
                                                Delet Task
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger card-link"
                                                id={p._id}
                                                onClick={this.handleUpdate}
                                            >
                                                Update Task
                                            </button>
                                        </div>
                                    </div>
                                    {/* <button
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
                                        </button> */}
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
export default connect(mapStateToProps)(withRouter(AllTask));
