import gql from "graphql-tag";

export default gql`#graphql

    type Query {
        authUser: User!
        authenticateUser(username: String!, password: String!): AuthResp!
        getAllUser:[User!] @isAuth
    }

    type Mutation{
        createNewUser(newUser: NewUserInput!):AuthResp!
        editUserById(updatedUser: UserInput!, id: ID!): User! 
        deleteUserById(id:ID!):UserNotification!
    }

    input NewUserInput{
        username: String!
        firstName: String!
        lastName: String!
        email:String!
        password: String!
    }

    input UserInput{
        username: String
        firstName: String
        lastName: String
        email:String
        password: String
        newpassword: String
    }

    type AuthResp{
        user: User,
        token: String
    }
    
    type User{
        id: ID
        username: String
        firstName: String
        lastName: String
        email:String
    }

    type UserNotification{
        id: ID!
        message: String,
        success: Boolean
    }
`;