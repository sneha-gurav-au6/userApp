const Validator = require("validator");
const isEmpty = require("./isEmpty");
//register validation

module.exports = function validateRegisterData(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    //check for if condition for true else throw error

    if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
        errors.name = "Name must be between 3 to 30 characters";
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = "Username is required";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (!Validator.isLength(data.password, { min: 4, max: 30 })) {
        errors.password = "Password must be at least 4 characters";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
