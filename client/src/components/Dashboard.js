import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userAction";
import { withRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
toast.configure();

const Dashboard = (props) => {
    const handlelogout = (e) => {
        e.preventDefault();
        props.logoutUser();
        toast.success("Logout Successfully!", {
            position: toast.POSITION.TOP_CENTER,
        });

        props.history.push("/login");
    };
    return (
        <div>
            <h1>User Logout</h1>
            <button className="btn btn-primary" onClick={handlelogout}>
                Logout
            </button>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps, { logoutUser })(withRouter(Dashboard));
