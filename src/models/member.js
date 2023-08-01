import { Schema, model } from "mongoose";

const MemberSchema = new Schema({
    member:{
        type: Schema.Types.ObjectId,
        ref:'users',
        required:true,
        populate: {
            includeDeleted: true
        }
    },
    active:{
        type: Boolean,
        required: true
    },
    project:{
        type: Schema.Types.ObjectId,
        ref:'projects',
        required:true
    },
},{timestamps:true});

const Member = model('members', MemberSchema);

export default Member;