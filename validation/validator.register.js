const Validator = require("validator");
const isEmpty = require("is-empty");

const validateInput = (data) => {

    let errors = {};

    // Empty fields to string
    data.email = isEmpty(data.email) ? "" : data.email;
    data.password = isEmpty(data.password) ? "" : data.password;
    data.password2 = isEmpty(data.password2) ? "" : data.password2;
    data.full_name = isEmpty(data.full_name) ? "" : data.full_name;

    // Data Validation
    /// Email
    if(Validator.isEmpty(data.email)){
        errors.email_empty = "E-mail address is required";
    }
    else if(!Validator.isLength(data.email, { min: 6 })){
        errors.email_length = "E-mail address must be at least 6 characters long";
    }
    else if(!Validator.isEmail(data.email)){
        errors.email_format = "E-mail address format is incorrect";
    }

    /// Password
    if(Validator.isEmpty(data.password)){
        errors.password_empty = "Password is required";
    }
    else if(!Validator.isLength(data.password, { min: 6 })){
        errors.password_length = "Password must be at least 6 characters long";
    }

    /// Password2
    if(Validator.isEmpty(data.password2)){
        errors.password2_empty = "Password confirm is required";
    }
    else if(!Validator.isLength(data.password2, { min: 6 })){
        errors.password2_length = "Password confirm must be at least 6 characters long";
    }

    /// Password match
    if(!Validator.equals(data.password, data.password2))
    {
        errors.password2 = "Passwords must match";
    }

    /// Name
    if(Validator.isEmpty(data.full_name)){
        errors.full_name_empty = "Name is required";
    }
    else if(!Validator.isLength(data.full_name, { min: 6 })){
        errors.full_name_length = "Name must be at least 6 characters long";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}

module.exports = validateInput;