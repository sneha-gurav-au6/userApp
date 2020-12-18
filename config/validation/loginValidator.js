const Validator = require("validator");
const isEmpty = require("./isEmpty");

//login validation
module.exports = function validateLoginData(data) {
    let errors = {};
    //data.email is email entered by user
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //check for if condition for true else throw error
    //error with entered email
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    //error with enrtered password
    if (!Validator.isLength(data.password, { min: 4, max: 30 })) {
        errors.password = "Password must be at least 4 characters";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    //return if there is any error ,if no error then isValid will be false
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
