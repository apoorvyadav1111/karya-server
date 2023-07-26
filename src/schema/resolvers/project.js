import { GraphQLError } from "graphql";
import mongo from 'mongodb';

export default {
    Query:{
        hello: ()=>"Lets Create a Project",
        getAllProjects: async(_,__,{Project,Member,user})=>{
            try{
                let memberOf = await Member.find({'member':user.id, 'active':true}, {_id:0, project:1}).lean();
                // console.log(memberOf);
                let result = await Project.find({'_id':{$in:memberOf.map(m=>m.project)}}).populate('owner');
                // console.log(allprojects);
                // let result = await Project.find({'owner':user.id}).populate('owner');
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
        createProject: async(_, {newProject},{Project, user, isAuth, Member}) =>{
            try{
                newProject.owner = user.id;
                let result = await Project.create({...newProject});
                await Member.create({member:user.id, project:result._id, active:true});
                await result.populate('owner');
                return result;
            }catch(err){
                throw new GraphQLError(err.message, {
                    extensions:{
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

        },
        updateProject: async(_, {id, updatedProject},{Project, user, isAuth}) =>{
            try{
                const updateOpts = {returnDocument: mongo.ReturnDocument.AFTER, upsert:false};
                let result = await Project.findOneAndUpdate({'_id':id, 'owner':user.id}, {...updatedProject}, updateOpts);
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