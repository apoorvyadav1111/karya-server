import gql from "graphql-tag";

export default gql`
    type Query{
        helloSection: String!
        getSectionById(id: ID!): Section! @isAuth
    }

    type Mutation{
        createSection(newSection: SectionInput!): Section! @isAuth
    }

    input SectionInput{
        name: String!,
        project: String!,
        start_date: Date!,
        description: String
    }
    type Section{
        id: ID!,
        name: String,
        description: String,
        project: Project,
        lead: User,
        start_date: Date,
        end_date: Date,
        due_date: Date
    }
`