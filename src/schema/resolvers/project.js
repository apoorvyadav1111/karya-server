import { GraphQLError } from "graphql";

export default {
    Query:{
        hello: ()=>"Hello, Lets Create a Project",
        getAllProjects: async(_,__,{Project,user})=>{
            try{
                let result = await Project.find({'owner':user.id}).populate('owner');
                return result;
            }catch(err){
                throw new GraphQLError(err.message,{
                    extensions:{
                        code:'BAD_USER_INPUT'
                    }
                })
            }
        }
    },
    Mutation:{
        createProject: async(_, {newProject},{Project, user, isAuth}) =>{
            try{
                newProject.owner = user.id;
                let result = await Project.create({...newProject});
                await result.populate('owner');
                return result;
            }catch(err){
                throw new GraphQLError(err.message, {
                    extensions:{
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

        }
    }
}