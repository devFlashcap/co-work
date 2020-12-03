const Validator = require("validator");
const isEmpty = require("is-empty");

const validateInput = (data) => {

    let errors = {};

    // Empty fields to string
    data.email = isEmpty(data.email) ? "" : data.email;

    // Data Validation
    /// Email
    if(Validator.isEmpty(data.email)){
        errors.email = "E-mail address is required";
    }
    else if(!Validator.isEmail(data.email)){
        errors.email = "E-mail address format is incorrect";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}

module.exports = validateInput;