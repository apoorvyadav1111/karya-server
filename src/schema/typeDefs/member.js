// schema for team
import gql from "graphql-tag";

export default gql`
    type Query{
        getAllTeam(project:String!): [Member] @isAuth
        getAllInvites: [Member] @isAuth
    }
    type Mutation{
        addMember(newMember: MemberInput!): Member! @isAuth
        acceptInvite(id: ID!): Member! @isAuth
        rejectInvite(id: ID!): Boolean @isAuth
        removeMember(id: ID!): Boolean @isAuth
    }
    input MemberInput{
        project: String!,
        member: String!,
        active: Boolean!
    }
    type Member{
        _id: ID!,
        member: User,
        active: Boolean!,
        project: Project
    }
`

    
