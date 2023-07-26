import user from './user';
import project from './project';
import section from './section';
import task from './task';
import { resolvers as scalarResolvers } from 'graphql-scalars';
import member from './member';

const customResolvers = {
    ...scalarResolvers
}
export default [
    user,
    project,
    section,
    task,
    member,
    customResolvers
]