import gql from "graphql-tag";

export default gql`
    type Query{
        helloTask:String!
        getTaskByID(id:ID!): Task @isAuth
    }

    type Mutation{
        createTask(newTask: TaskInput!): Task! @isAuth
    }

    input TaskInput{
        name: String!,
        description: String,
        hours_spent: Int,
        total_hours: Int,
        start_date: Date!,
        end_date: Date,
        due_date: Date,
        project: ID,
        section: ID,
        assigned_by: ID,
        assigned_to: ID,
        type:String
    }

    type Task{
        id: ID,
        name: String!,
        description: String,
        hours_spent: Int,
        total_hours: Int,
        start_date: Date!,
        end_date: Date,
        due_date: Date,
        project: ProjectInfo,
        section: SectionInfo,
        assigned_by: User,
        assigned_to: User,
        type:String,
        link: Task
    }

    type ProjectInfo{
        id: ID,
        name: String,
    }

    type SectionInfo{
        id: ID,
        name: String
    }
`