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
            dispatch({ type: Get_Error, payload: err.response.data });
        });
};

export const loginUsers = (data) => async (dispatch) => {
    console.log(data.newUser);
    await axios
        .post("/user/login", data.newUser)
        .then((data1) => {
            if (data1.status === 200) {
                toast.success("Logged in successfully", {
                    position: toast.POSITION.TOP_CENTER,
                });

                console.log(data1.data);
                // dispatch({ type: LoginUser, payload: data1.data.user });
                setToken(data1.data.token, dispatch);
            }
            console.log(data1.data);
            setToken(data1.data.token, dispatch);
        })
        .catch((err) => {
            console.log(err.response.data);
            dispatch({ type: Get_Error, payload: err.response.data });
        });
};

// export const AllTodo = () => (dispatch) => {
//     axios
//         .get("/getalluser")
//         .then((data) => {
//             console.log(data.data.data);
//             // dispatch({ type: Todo, payload: data.data.data });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };
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
