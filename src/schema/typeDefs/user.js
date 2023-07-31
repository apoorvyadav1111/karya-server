import gql from "graphql-tag";

export default gql`#graphql

    type Query {
        authUser: User!
        authenticateUser(username: String!, password: String!): AuthResp!
        getUser:User! @isAuth
    }

    type Mutation{
        createNewUser(newUser: NewUserInput!):AuthResp!
        editUser(updatedUser: UserInput!): User! 
        deleteUser(password: String!):UserNotification!
        updatePassword(oldPassword: String!, newPassword: String!): UserNotification!
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