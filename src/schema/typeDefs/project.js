import gql from "graphql-tag";

export default gql`#graphql
    type Query{
        hello: String!
        getAllProjects: [Project] @isAuth
    }

    type Mutation{
        createProject(newProject: ProjectInput!): Project! @isAuth
        updateProject(id: ID!, updatedProject: ProjectInput!): Project! @isAuth
    }

    input ProjectInput{
        name:String,
        description: String,
        start_date: Date,
        end_date: Date,
        due_date: Date
    }

    type Project{
        id: ID
        name: String,
        description: String,
        start_date: Date,
        end_date: Date,
        due_date: Date,
        owner: User!
    }

`