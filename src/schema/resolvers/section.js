import { GraphQLError } from "graphql";
import { resourceUsage } from "process";

export default {
    Query:{
        helloSection: () => "Hello lets create a section",
        getSectionById: async(_, {id}, {Section, user, isAuth})=>{
            try{
                // need to check the user is allowed to fetch this section of not
                // using team of the project
                // to do
                let result = await Section.findById(id);
                await (await result.populate('lead')).populate('project');
                await result.populate('project.owner');
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
        createSection: async(_,{newSection},{Section, user, isAuth})=>{
            try{
                let {lead} = newSection;
                if(!lead){
                    newSection.lead = user.id;
                }
                let result = await Section.create({...newSection});
                await (await result.populate('lead')).populate('project');
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