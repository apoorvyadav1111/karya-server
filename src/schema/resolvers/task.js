import { GraphQLError } from "graphql";

export default {
    Query:{
        helloTask: () => "Hello lets create a task",
        getTaskByID: async(_, {id}, {Task, user, isAuth})=>{
            try{
                let result = await Task.findById(id);
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
        }
    },
    Mutation:{
        createTask: async(_, {newTask}, {Task, user, isAuth}) => {
            try{
                let {assigned_by , assigned_to} = newTask;
                if(!assigned_by){
                    newTask.assigned_by = user;
                }
                if(!assigned_to){
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
        }
    }
}