import user from "./user"
import base from "./base"
import project from "./project"
import section from "./section"
import task from "./task"
import member from "./member"
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';

// import gql from "graphql-tag";


// export default gql`
//     type Query{
//       hello: String!
//     }
// `;
const customTypeDefs = [
  ...scalarTypeDefs,
  // other typeDefs
];

export default [
  base,
  user,
  project,
  section,
  task,
  member,
  customTypeDefs
]