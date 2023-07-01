import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { GraphQLError, defaultFieldResolver } from 'graphql';

// This function takes in a schema and adds upper-casing logic
// to every resolver for an object field that has a directive with
// the specified name (we're using `upper`)
export default function AuthDirectiveTransformer(schema, directiveName) {
    return mapSchema(schema, {
      // Executes once for each object field in the schema
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        // Check whether this field has the specified directive
        const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
  
        if (authDirective) {
          // Get this field's original resolver
          const { resolve = defaultFieldResolver } = fieldConfig;
  
          // Replace the original resolver with a function that *first* calls
          // the original resolver, then converts its result to upper case
          fieldConfig.resolve = async function (...args) {
            let [_, {}, {user, isAuth},] = args;
            if(isAuth){
                let result = await resolve.apply(this, args);
                return result;
            }else{
                throw new GraphQLError("You must be authenticated to get this information");
            }
          };
          return fieldConfig;
        }
      },
    });
  }
  