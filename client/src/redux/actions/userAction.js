import {
    RegisterUser,
    LoginUser,
    UserProfile,
    Get_Error,
    Todo,
} from "./userType";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
toast.configure();

//calling the register route and dispatching user input for register
export const RegisterUsers = (data1) => async (dispatch) => {
    console.log(data1.newUser);

    await axios
        .post("/user/register", data1.newUser)
        .then((res) => {
            if (res.status === 200) {
                toast.success("Registered successfully", {
                    position: toast.POSITION.TOP_CENTER,
                });
                dispatch({ type: RegisterUser, payload: res.data.user });
            }
            dispatch({ type: RegisterUser, payload: res.data.user });
        })
        .catch((err) => {
            //if error ,set error in reducer
            dispatch({ type: Get_Error, payload: err.response.data });
        });
};

//calling the login route and dispatching user input for login
export const loginUsers = (data) => async (dispatch) => {
    console.log(data.newUser);
    await axios
        .post("/user/login", data.newUser)
        .then((data1) => {
            if (data1.status === 200) {
                toast.success("Logged in successfully", {
                    position: toast.POSITION.TOP_CENTER,
                });

                //calling set token and passing parameters
                setToken(data1.data.token, dispatch);
            }
            console.log(data1.data);
            setToken(data1.data.token, dispatch);
        })
        .catch((err) => {
            //if error ,set error in reducer
            console.log(err.response.data);
            dispatch({ type: Get_Error, payload: err.response.data });
        });
};

export const setToken = (res, dispatch) => {
    // Save token to local storage
    const token = res;
    // Set token to ls
    localStorage.setItem("jwtToken", token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode jwt token
    const decode = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(decode));
};

export const setCurrentUser = (decode) => {
    return { type: LoginUser, payload: decode };
};

export const logoutUser = () => (dispatch) => {
    // Remove token from localStorage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future request
    setAuthToken(false);
    // Set current user to {} and isAuthenticator to false
    dispatch(setCurrentUser({}));
};
