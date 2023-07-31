import { Schema, model } from "mongoose";

const SectionSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    }, 
    project:{
        type:Schema.Types.ObjectId,
        ref:'projects',
        required:true
    },
    lead:{
        type:Schema.Types.ObjectId,
        ref:'users',
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
        type:Date,
    },
},{timestamps: true});

const Section = model('sections', SectionSchema);

export default Section;