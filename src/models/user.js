import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    }
}, {timestamps:true});

const User = model('users', UserSchema);

export default User;