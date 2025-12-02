// jwt token

import jwt from 'jsonwebtoken'

 export const generateToken =(id)=>{
    return jwt.sign({id}, process.env.SECRET,{expiresIn:'7d'})
}