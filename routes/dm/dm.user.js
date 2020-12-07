const response_code = require('../dm/response.code');

const bcrypt = require("bcryptjs");
const ModelUser = require('../../models/model.user');
const conditions = require('./user.read.conditions');

module.exports.user_create = async data => {
    try{
        const user = await ModelUser.findOne({email: data.email});
        if(user){
            return {
                status: response_code.HTTP_400,
                response: {email: 'E-mail address is already taken'}
            }
        }

        const newUser = new ModelUser({
            email: data.email,
            password: data.password,
            full_name: data.full_name,
            level: 0
        });

        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(newUser.password, salt);
        newUser.password = passwordHashed;

        const saveUser = await newUser.save();
        return {
            status: response_code.HTTP_200,
            response: saveUser
        }
    }
    catch(err){
        return {
            status: response_code.HTTP_500,
            response: err
        }
    }
};

module.exports.user_login = async data => {
    try{
        const user = await ModelUser.findOne({ email: data.email });
        if (!user) {
            return {
                status: response_code.HTTP_404,
                response: { email: "E-mail address not found" }
            };
        }

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            return {
                status: response_code.HTTP_400,
                response: { password: "Invalid password" }
            };
        }
  
        return {
            status: response_code.HTTP_200,
            response: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                level: user.level
            }
        };
    }
    catch(err){
        return {
            status: response_code.HTTP_500,
            response: err
        }
    }
};

module.exports.user_password_change = async data => {
    try{
        const user = await ModelUser.findOne({ email: data.email });
        if (!user) {
            return {
                status: response_code.HTTP_404,
                response: { email: "E-mail address not found" }
            };
        }

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            return {
                status: response_code.HTTP_400,
                response: { password: "Invalid password" }
            };
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(data.password2, salt);
        user.password = passwordHashed;

        await user.save();
  
        return {
            status: response_code.HTTP_200,
            response: { passwordChange: "Password has been changed successfully" }
        };
    }
    catch(err){
        return {
            status: response_code.HTTP_500,
            response: err
        }
    }
};

module.exports.user_selection_load = async data => {
    try{
        const user = await ModelUser.findById(data.userID);
        if(user) {
            let condition = null;
            switch(data.condition){
                case conditions.ALL:
                    condition = {
                        _id: { $ne: data.userID }
                    };
                    break;
                case conditions.LEVEL_LESS:
                    condition = { 
                        _id: { $ne: data.userID },
                        level: { $lt: user.level } 
                    };
                    break;
            }

            if(condition !== null){
                const users = await ModelUser.find(condition, 'full_name email level');
                if(!users) {
                    return {
                        status: response_code.HTTP_404,
                        response: { email: "Users not found" }
                    };
                }
                
                return {
                    status: response_code.HTTP_200,
                    response: users
                };
            }
        }
    }  
    catch(err){
        return {
            status: response_code.HTTP_500,
            response: err
        }
    }
};

module.exports.user_read = async data => {
    try{
        const user = await ModelUser.findById(data.userID);
        if (user) {
            return {
                status: response_code.HTTP_200,
                response: user
            };
        }

        return {
            status: response_code.HTTP_404,
            response: null
        };
    }
    catch(err){
        return {
            status: response_code.HTTP_500,
            response: err
        }
    }
};

module.exports.user_modify = async data => {
    try{
        const user = await ModelUser.findById(data.userID).select("email full_name level");
        if(user){
            user.email = data.email;
            user.full_name = data.full_name;
            user.level = data.level;
            const saveUser = await user.save();
            return {
                status: response_code.HTTP_200,
                response: saveUser
            }
        }
        else{
            return {
                status: response_code.HTTP_404,
                response: {user: 'User not found'}
            }
        }
    }
    catch(err){
        return {
            status: response_code.HTTP_500,
            response: err
        }
    }
};