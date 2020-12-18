//importing user type
import { RegisterUser, LoginUser, Get_Error, User } from "../actions/userType";

//importing isEmpty
import isEmpty from "../../utils/is-empty";

const INITIAL_STATE = {
    isAuthenticated: false,
    user: {},
    RegisterUser: {},
    errors: {},
    UserProfile: null,
    user: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        //case for register user
        case RegisterUser: {
            return {
                ...state,
                //set payload in RegisterUser
                RegisterUser: payload,
            };
        }

        // case for login user
        case LoginUser: {
            return {
                ...state,
                //set payload in user
                user: action.payload,
                //check payload is empty or not and set to authenticate ,if payload is present then isAuthenticate is true
                isAuthenticated: !isEmpty(action.payload),
            };
        }
        case User: {
            return {
                ...state,
                user: action.payload,
            };
        }

        //case for error occured in validation
        case Get_Error: {
            return {
                ...state,
                errors: action.payload,
            };
        }
        default:
            return { ...state };
    }
};

export default userReducer;
