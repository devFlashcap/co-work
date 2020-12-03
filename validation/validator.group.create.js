const Validator = require("validator");
const isEmpty = require("is-empty");

const validateInput = (data) => {

    let errors = {};

    // Empty fields to string
    data.name = isEmpty(data.name) ? "" : data.name;
    data.leader = isEmpty(data.leader) ? "" : data.leader;
    data.members = isEmpty(data.members) ? [] : data.members;
    avatar_bgcolor = isEmpty(data.avatar_bgcolor) ? "" : data.avatar_bgcolor;
    avatar_color = isEmpty(data.avatar_color) ? "" : data.avatar_color;

    // Data Validation
    /// Group name
    if(Validator.isEmpty(data.name)){
        errors.name_empty = "Group name is required";
    }

    /// Group leader
    if(Validator.isEmpty(data.leader)){
        errors.leader_empty = "Group leader is required";
    }

    /// Group members
    if(data.members.length === 0){
        errors.members_empty = "Group members are required";
    }

    /// Group avatar bgcolor
    if(Validator.isEmpty(data.avatar_bgcolor)){
        errors.avatar_bgcolor_empty = "Avatar background color is required";
    }

    /// Group avatar color
    if(Validator.isEmpty(data.avatar_color)){
        errors.avatar_color_empty = "Avatar text color is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
    
}

module.exports = validateInput;