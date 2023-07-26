import { GraphQLError } from "graphql";
import * as mongo from 'mongodb';
export default {
    Query:{
        helloTask: () => "Hello lets create a task",
        getTaskByID: async(_, {id}, {Task, user, Member, isAuth})=>{
            try{

                let result = await Task.findById(id);
                await result.populate('assigned_by');
                await result.populate('assigned_to');
                await result.populate('project');
                await result.populate('section');
                await result.populate('link');
                return result;
            }catch(err){
                throw new GraphQLError(err.message, {
                    extensions:{
                        code:'BAD_USER_INPUT'
                    }
                }) 
            }
        },
        getAllTask: async(_, __, {Task, user, isAuth})=>{
            try{
                let {id} = user;
                let result = await Task.find({'assigned_to':id})
                    .populate('assigned_by')
                    .populate('assigned_to')
                    .populate('project')
                    .populate('section')
                    .populate('link')
                    .sort({'start_date':-1});
                return result;
            }catch(err){
                throw new GraphQLError(err.message, {
                    extensions:{
                        code:'BAD_USER_INPUT'
                    }
                }) 
            }
        },
        getTasks: async(_, {search}, {Task, user, isAuth})=>{
            try{
                // check if the person querying is in the project team
                // let member = await Member.findOne({'member':user, 'project':id});
                let result = await Task.find({...search})
                    .populate('assigned_by')
                    .populate('assigned_to')
                    .populate('project')
                    .populate('section')
                    .populate('link')
                    .sort({'start_date':-1});
                return result;
            }catch(err){
                throw new GraphQLError(err.message, {
                    extensions:{
                        code:'BAD_USER_INPUT'
                    }
                }) 
            }
        }
    },
    Mutation:{
        createTask: async(_, {newTask}, {Task, user, isAuth}) => {
            try{
                let {assigned_by , assigned_to} = newTask;
                console.log(newTask);

                if(!assigned_by || assigned_by===''){
                    newTask.assigned_by = user;
                }
                if(!assigned_to || assigned_to===''){
                    newTask.assigned_to = user;
                }
                let result = await Task.create({...newTask});
                await result.populate('assigned_by');
                await result.populate('assigned_to');
                await result.populate('project');
                await result.populate('section');
                return result;
            }catch(err){
                throw new GraphQLError(err.message, {
                    extensions:{
                        code:'BAD_USER_INPUT'
                    }
                })
            }
        },

        updateTask: async(_, {id, taskPatch}, {Task, user, isAuth}) => {
            try{
                const updateOpts = {returnDocument: mongo.ReturnDocument.AFTER, upsert:false};
                let newTask = await Task.findOneAndUpdate({_id:id}, {...taskPatch}, updateOpts);
                if(!newTask){
                    return {
                        success:false,
                        task:null
                    }
                }
                await newTask.populate('assigned_by');
                await newTask.populate('assigned_to');
                await newTask.populate('project');
                await newTask.populate('section');
                return {
                    success:true,
                    task:newTask
                }
            }catch(err){
                throw new GraphQLError(err.message, {
                    extensions:{
                        code:'BAD_USER_INPUT'
                    }
                })
            }
        },

        deleteTask: async(_, {id}, {Task, user, isAuth}) => {
            try{
                let result = await Task.findByIdAndDelete(id);
                console.log(result);
                if(!result){
                    return false;
                }
                return true;
            }catch(err){
                throw new GraphQLError(err.message, {
                    extensions:{
                        code:'BAD_USER_INPUT'
                    }
                })
            }
        }


    }
}