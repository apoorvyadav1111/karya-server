import gql from "graphql-tag";



export default gql`#graphql
  directive @isAuth on FIELD_DEFINITION
  
  type Query {
    _: String!,
    user: String!
  }

  type Mutation {
    _:String!
  }

  type Subsription{
    _: String!
  }
`;