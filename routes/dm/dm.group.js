const mongoose = require('mongoose');
const ModelGroup = require('../../models/model.group');
const response_code = require('../dm/response.code');

module.exports.group_read_all = async () => {
    try{
        const groups = await ModelGroup.find({})
        .populate({
            path: 'leader', select: 'full_name email',
        })
        .populate({
            path: 'members', select: 'full_name email'
        });
        if(groups){
            return {
                status: response_code.HTTP_200,
                response: groups
            }
        }
        return {
            status: response_code.HTTP_400,
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

module.exports.group_read_for_user = async data => {
    try{
        const groups = await ModelGroup.find( { members: mongoose.Types.ObjectId(data.userID)}, 'name avatar_color avatar_bgcolor');
        if(groups){
            return {
                status: response_code.HTTP_200,
                response: groups
            }
        }
        return {
            status: response_code.HTTP_400,
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

module.exports.group_read = async data => {
    try{
        const group = await ModelGroup.findById(data.groupID);
        if(group){
            return {
                status: response_code.HTTP_200,
                response: group
            }
        }
        return {
            status: response_code.HTTP_400,
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

module.exports.group_read_members = async data => {
    try{
        const members = await ModelGroup.find( { _id: mongoose.Types.ObjectId(data.groupID) }, 'members -_id');
        if(members){
            return {
                status: response_code.HTTP_200,
                response: members
            }
        }
        return {
            status: response_code.HTTP_400,
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


module.exports.group_remove = async data => {
    try{
        const group = await ModelGroup.deleteOne({
            _id: data.groupID,
        });
        if(!group){
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

module.exports.group_create = async data => {
    try{
        const group = await ModelGroup.findOne({name: data.name});
        if(group){
            return {
                status: response_code.HTTP_400,
                response: {name: 'Group name is already taken'}
            }
        }

        const newGroup = new ModelGroup({
            name: data.name,
            leader: data.leader,
            avatar_color: data.avatar_color,
            avatar_bgcolor: data.avatar_bgcolor,
            members: [data.leader, ...data.members],
            messages: []
        });
        
        const saveGroup = await newGroup.save();
        const savedGroup = await ModelGroup.findOne(saveGroup)
            .populate({
                path: 'leader', select: 'full_name email',
            })
            .populate({
                path: 'members', select: 'full_name email'
            });
        return {
            status: response_code.HTTP_200,
            response: savedGroup
        }
    }
    catch(err){
        return {
            status: response_code.HTTP_500,
            response: err
        }
    }
};

module.exports.group_modify = async data => {
    try{
        const group = await ModelGroup.findById(data.groupID);
        if(group){
            group.name = data.name;
            group.leader = data.leader,
            group.avatar_color = data.avatar_color,
            group.avatar_bgcolor = data.avatar_bgcolor,
            group.members = [data.leader, ...data.members];
            const saveGroup = await group.save();
            const savedGroup = await ModelGroup.findOne(saveGroup)
            .populate({
                path: 'leader', select: 'full_name email',
            })
            .populate({
                path: 'members', select: 'full_name email'
            });
            return {
                status: response_code.HTTP_200,
                response: savedGroup
            }
        }
        else{
            return {
                status: response_code.HTTP_404,
                response: {group: 'Group not found'}
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

module.exports.group_loadMessages = async data => {
    try{
        const group = await ModelGroup.findById(data._id).select('messages -_id')
        .populate({
                path: 'messages',
                populate: { path: 'sender', select: 'full_name' }
        })
        .sort({createdAt: -1});

        if(group){
            return {
                status: response_code.HTTP_200,
                response: group.messages
            }
        }
        return {
            status: response_code.HTTP_400,
            response: null
        }
    }
    catch(err){
        console.log(err);
        return {
            status: response_code.HTTP_500,
            response: err
        }
    }
    
};