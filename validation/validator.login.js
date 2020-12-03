const Validator = require("validator");
const isEmpty = require("is-empty");

const validateInput = (data) => {

    let errors = {};

    // Empty fields to string
    data.email = isEmpty(data.email) ? "" : data.email;
    data.password = isEmpty(data.password) ? "" : data.password;

    // Data Validation
    /// Email
    if(Validator.isEmpty(data.email)){
        errors.email_empty = "E-mail address is required";
    }
    else if(!Validator.isEmail(data.email)){
        errors.email_format = "E-mail address format is incorrect";
    }

    /// Password
    if(Validator.isEmpty(data.password)){
        errors.password_empty = "Password is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
    
}

module.exports = validateInput;