import { populate } from 'dotenv';
import { GraphQLError } from 'graphql';

export default {
    Query:{
        getAllTeam: async (_, {project}, {Member}) => {
            try{
                const team = await Member.find({"project":project}).populate('member').populate('project');
                return team;
            }catch(err){
                throw new GraphQLError(err);
            }
        },

        getAllInvites: async (_, __, {Member, user}) => {
            try{
                const invites = await Member.find({"member":user._id, "active":false})
                    .populate('member')
                    .populate({
                        path:'project',
                        populate:{
                            path:'owner'
                        }
                    }
                    )
                return invites;
            }catch(err){            
                throw new GraphQLError(err);
            }
        }
    },
    Mutation:{
        addMember: async (_, {newMember}, {Member, User}) => {
            console.log(newMember);
            try{
                const user = await User.findOne({"username":newMember.member});
                if(user){
                    newMember.member = user._id;
                    console.log(newMember);
                    const member = await Member.create(newMember);
                    return member;
                }else{
                    throw new GraphQLError("User does not exist");
                }
            }catch(err){
                console.log('here');
                console.log(err);
                throw new GraphQLError(err);
            }
        },

        acceptInvite: async (_, {id}, {Member, user}) => {
            try{
                const member = await Member.findOneAndUpdate({"_id":id, "member":user.id}, {"active":true});
                return member;
            }catch(err){
                throw new GraphQLError(err);
            }
        },

        rejectInvite: async (_, {id}, {Member, user}) => {
            try{
                const member = await Member.findOneAndDelete({"_id":id, "member":user.id});
                return member?true:false;
            }catch(err){
                throw new GraphQLError(err);
            }
        },

        removeMember: async (_, {id}, {Member, Project, user}) => {
            try{  
                const project = await Member.findOne({"_id":id},{"project":1});
                const isOwner = await Project.findOne({"_id":project.project, "owner":user.id});
                if(!isOwner){
                    throw new GraphQLError("You are not the owner of this project");
                }
                const member = await Member.findOneAndDelete({"_id":id});
                return member?true:false;
            }catch(err){
                throw new GraphQLError(err);
            }
        }
    }
}