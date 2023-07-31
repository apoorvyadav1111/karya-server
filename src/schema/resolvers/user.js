import bcryptjs from "bcryptjs";
import * as authUtil from "../../utils/user/auth"
import { GraphQLError } from 'graphql';
import mongo from 'mongodb';


export default {
    Query:{
        getUser: async (_,{}, {User, user}) => {
            const res = await User.findById(user.id);
            return res
        },
        authenticateUser: async(_,{username, password},{User}) =>{
            try{
                let user = await User.findOne({ username });
                if(!user){
                    throw new GraphQLError('Username not found',{
                        extensions: {
                          code: 'BAD_USER_INPUT'
                      }
                  },);     
                }
                let isMatch = await bcryptjs.compare(password, user.password);
                
                if(!isMatch){
                    throw new GraphQLError('Invalid Credentials',{
                        extensions: {
                          code: 'BAD_USER_INPUT'
                      }
                    },);
                }
                
                user = user.toObject();
                user.id = user._id;
                user = authUtil.serializeUser(user);
                let token = authUtil.issueAccessToken(user);
                return {
                    token,
                    user
                }


            }catch(err){
                if(err instanceof Error){
                    throw new GraphQLError(err.message,{
                        extensions: {
                          code: 'BAD_USER_INPUT'
                      }
                  },);                
                }
            }


        }
    },
    Mutation:{
        createNewUser: async(_, {newUser}, {User}) => {
            console.log(newUser);
            try{
                let { username, email} = newUser;

                let user = await User.findOne({
                    username
                });
    
                if(user){
                    throw new Error("Username is already taken")
                }
    
                user = await User.findOne({
                    email
                })
    
                if(user){
                    throw new Error("Email is already taken");
                }
    
                // const res = await User.create(newUser)
                user = new User(newUser);

                user.password = await bcryptjs.hash(user.password, 12);

                let result = await user.save();
                result = result.toObject();
                result.id = result._id;
                result = authUtil.serializeUser(result);
                console.log(result);
                let token = await authUtil.issueAccessToken(result);

                return {
                    token,
                    user: result
                }
            }catch(err){
                if(err instanceof Error){
                    throw new GraphQLError(err.message,{
                                  extensions: {
                                    code: 'BAD_USER_INPUT'
                                }
                            },);
                }
            }

        },
        editUser: async(_, {updatedUser}, {User, user})=>{
            const oldUser = await User.findById(user.id, {username:1,firstName:1,lastName:1,email:1, _id:0});
            console.log(oldUser, updatedUser);
            if(oldUser.username===updatedUser.username && oldUser.email===updatedUser.email && oldUser.firstName===updatedUser.firstName && oldUser.lastName===updatedUser.lastName){
                throw new GraphQLError('No Changes Made',{
                    extensions: {
                      code: 'BAD_USER_INPUT'
                  }
              },);
            }
            if(oldUser.username!=updatedUser.username){
                const user = await User.findOne({username:updatedUser.username});
                if(user){
                    throw new GraphQLError('Username is already taken',{
                        extensions: {
                            code: 'BAD_USER_INPUT'
                        }
                    },);
                }
            }
            console.log(oldUser.email, updatedUser.email);
            if(oldUser.email!=updatedUser.email){
                const user = await User.findOne({email:updatedUser.email});
                if(user){
                    throw new GraphQLError('Email is already taken',{
                        extensions: {
                            code: 'BAD_USER_INPUT'
                        }
                    },);
                }
            }
            const updateOpts = {returnDocument: mongo.ReturnDocument.AFTER, upsert:false};
            const res = await User.findByIdAndUpdate(user, {...updatedUser}, updateOpts);
            return res;
        },
        deleteUser: async(_,{password},{User, Member, Task, Project, user})=>{
            let res = await User.findById(user.id);
            let isMatch = await bcryptjs.compare(password, res.password);
            console.log(isMatch);
            if(!isMatch){
                throw new GraphQLError('Password is incorrect',{
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                },);
            }
            await Member.deleteMany({user:user.id});
            await Task.deleteMany({assigned_by:user.id, assigned_to:user.id, project:null});
            await Project.deleteMany({owner:user.id});
            res = await User.findByIdAndDelete(user.id);

            return {
                message:'User account is deleted',
                id: res.id,
                success:true
            }
        },
        updatePassword: async(_,{oldPassword, newPassword},{User, user})=>{
            const res = await User.findById(user.id);
            let isMatch = await bcryptjs.compare(oldPassword, res.password);
            if(isMatch){
                newPassword = await bcryptjs.hash(newPassword, 12);
                const updateOpts = {returnDocument: mongo.ReturnDocument.AFTER, upsert:false};
                const res = await User.findByIdAndUpdate(user, {password:newPassword}, updateOpts);
                return {
                    message:'Password is updated',
                    id: res.id,
                    success:true
                }
            }else{ 
                throw new GraphQLError('Old password is incorrect',{
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                },);
            }
        }
    }

}