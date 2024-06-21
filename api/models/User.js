const mongoose = require('mongoose');
const {Schema} = mongoose


const UserShcema = new Schema ({

    name: String,
    email: {type:String , unique:true},
    password: String,
})

const UserModel = mongoose.model('User', UserShcema);

module.exports = UserModel;