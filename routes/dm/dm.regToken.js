const ModelRegistrationToken = require('../../models/model.registrationToken');
const ModelUser = require('../../models/model.user');
const config = require('../../config/keys');

const response_code = require('./response.code');

module.exports.regToken_create = async data => {
    try{
        const regToken = await ModelRegistrationToken.findOne({
            email: data.email,
            isValid: true
        });

        if(regToken){
            return {
                status: response_code.HTTP_400,
                response: {email: 'There\'s a valid registration token for the e-mail address given'}
            }
        }
        else{
            const newRegistrationToken = new ModelRegistrationToken({
                email: data.email,
                expiresAt: data.expiresAt,
                isValid: true
            });
            const saveRegistrationToken = await newRegistrationToken.save();
            return {
                status: response_code.HTTP_200,
                response: saveRegistrationToken
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

module.exports.regToken_makeInvalid = async data => {
    try{
        const regToken = await ModelRegistrationToken.findById(data.tokenID);
        if(!regToken){
            return {
                status: response_code.HTTP_404,
                response: {token: 'Token not found'}
            }
        }
        regToken.isValid = false;
        await regToken.save();

        return {
            status: response_code.HTTP_200,
            response: "token deleted"
        }
    }
    catch(err){
        return {
            status: response_code.HTTP_500,
            response: err
        }
    }
};

module.exports.regToken_read = async data => {
    try{
        const regToken = await ModelRegistrationToken.findOne({
            _id: data.tokenID,
            isValid: true
        });
        if(!regToken){
            return {
                status: response_code.HTTP_404,
                response: {token: 'Token not found'}
            }
        }
        return {
            status: response_code.HTTP_200,
            response: regToken
        }
    }
    catch(err){
        return {
            status: response_code.HTTP_500,
            response: err
        }
    }
};

module.exports.regToken_selection_load = async data => {
    try{
        const regTokens = await ModelRegistrationToken.find({
            isValid: true
        });
        if(!regTokens){
            return {
                status: response_code.HTTP_404,
                response: {token: 'Tokens not found'}
            }
        }
        return {
            status: response_code.HTTP_200,
            response: regTokens
        }
    }
    catch(err){
        return {
            status: response_code.HTTP_500,
            response: err
        }
    }
};

module.exports.regToken_remove = async data => {
    try{
        const regToken = await ModelRegistrationToken.deleteOne({
            _id: data.tokenID,
        });
        if(!regToken){
            return {
                status: response_code.HTTP_404,
                response: {token: 'Token not found'}
            }
        }
        return {
            status: response_code.HTTP_200,
            response: null
        }
    }
    catch(err){
        return {
            status: response_code.HTTP_500,
            response: err
        }
    }
};