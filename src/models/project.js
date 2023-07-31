import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    description:{
        type:String,
    },
    sections:[
        {type: Schema.Types.ObjectId, ref:'sections'}
    ],
    tasks:[
        {type: Schema.Types.ObjectId, ref:'tasks'}
    ],
    owner:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'users'
    },
    start_date:{
        type:Date,
        required: true
    },
    end_date:{
        type:Date,
    },
    due_date:{
        type:Date,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
}, {timestamps:true});


const Project = model('projects', ProjectSchema);

export default Project;