import jwt from "jsonwebtoken";
import { User } from "../models";
import dev from '../config/dev';

const AuthMiddleware = async (req, res, next) =>{
    const authHeaders = req.get("Authorization");
    console.log(authHeaders);
    if(!authHeaders){
        req.isAuth = false;
        return next();
    }

    let token = authHeaders.split(' ')[1];
    if(!token || token ===''){
        req.isAuth = false;
        return next();
    }

    let decodedToken;
    try{
        decodedToken = jwt.verify(token, dev.SECRET_KEY);
    }catch(err){
        req.isAuth = false;
        return next();
    }

    console.log(decodedToken);

    let authUser = await User.findById(decodedToken.id);

    if(!authUser){
        req.isAuth = false;
        return next();
    }

    req.isAuth = true;
    req.user   = authUser
    next();

}

export default AuthMiddleware;