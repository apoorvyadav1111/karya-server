import gql from "graphql-tag";

export default gql`
    type Query{
        helloTask:String!
        getTaskByID(id:ID!): Task @isAuth
        getAllTask: [Task] @isAuth
        getTasks(search:TaskSearch): [Task] @isAuth
    }

    type Mutation{
        updateTask(id:ID!, taskPatch: TaskPatch!): PatchResp! @isAuth
        createTask(newTask: TaskInput!): Task! @isAuth
        deleteTask(id:ID!): Boolean! @isAuth
    }

    input TaskInput{
        name: String!,
        description: String,
        status: String,
        hours_spent: Int,
        total_hours: Int,
        start_date: Date!,
        end_date: Date,
        due_date: Date,
        project: ID,
        section: ID,
        assigned_by: ID,
        assigned_to: ID,
        link: ID,
        type:String
    }

    type Task{
        id: ID,
        name: String!,
        description: String,
        status: String,
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
    input TaskSearch{
        name: String,
        project: ID,
        section: ID,
        assigned_by: ID,
        assigned_to: ID,
        type:String
    }
    type PatchResp{
        success: Boolean,
        task: Task
    }
    input TaskPatch{
        name: String,
        description: String,
        status: String,
        hours_spent: Int,
        total_hours: Int,
        start_date: Date, 
        end_date: Date,
        due_date: Date,
        assigned_to: ID,
        type:String
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