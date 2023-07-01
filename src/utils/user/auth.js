import  jwt  from 'jsonwebtoken'
import lodash from 'lodash';
import dev from '../../config/dev';

export const  issueAccessToken = async (user) => {
    let token = await jwt.sign({id: user.id}, dev.SECRET_KEY,{expiresIn: 24*60*60});
    return `Bearer ${token}`;
}

export const serializeUser = (user) => {
    return lodash.pick(user, ['id', 'username', 'email','firstName', 'lastName'])
}