import { Schema, model } from "mongoose";

const TeamSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref:'projects',
        required:true
    },
    member:{
        type: Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    active:{
        type: Boolean,
        required: true
    }
},{timestamps:true});

const Team = model('teams', TeamSchema);

export default Team;