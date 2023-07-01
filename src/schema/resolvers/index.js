import user from './user';
import project from './project';
import section from './section';
import task from './task';
import dateScalar from '../scalars/date';
import { resolvers as scalarResolvers } from 'graphql-scalars';

const customResolvers = {
    ...scalarResolvers
}
export default [
    user,
    project,
    section,
    task,
    customResolvers
]