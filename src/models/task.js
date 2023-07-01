import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    hours_spent:{
        type:Number,
    },
    total_hours:{
        type:Number,
        required: true
    },
    start_date:{
        type:Date,
        required: true
    },
    end_date:{
        type:Date,
    },
    due_date:{
        type:Date
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'projects'
    },
    section: {
        type: Schema.Types.ObjectId,
        ref: 'sections'
    },
    assigned_by:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required:true
    },
    assigned_to:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    type:{
        type:String,
        required:true,
    },
    link:{
        type:Schema.Types.ObjectId,
        ref:'tasks'
    }
}, {timestamps:true});

const Task = model('tasks', TaskSchema);

export default Task;