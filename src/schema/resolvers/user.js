import bcryptjs from "bcryptjs";
import * as authUtil from "../../utils/user/auth"
import { GraphQLError } from 'graphql';

export default {
    Query:{
        getAllUser: async (_,{}, {User}) => {
            const res = await User.find({});
            return res
        },
        authenticateUser: async(_,{username, password},{User}) =>{
            try{
                let user = await User.findOne({ username });
                if(!user){
                    throw new Error('Username not found')
                }
                let isMatch = await bcryptjs.compare(password, user.password);
                
                if(!isMatch){
                    throw new Error('Invalid Password')
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
        editUserById: async(_, {updatedUser, id}, {User})=>{
            const res = await User.findByIdAndUpdate(id, {...updatedUser}, {new:true});
            return res;
        },
        deleteUserById: async(_,{id},{User})=>{
            const res = await User.findByIdAndDelete(id)
            return {
                message:'User account is deleted',
                id: res.id,
                success:true
            }
        }
    }

}