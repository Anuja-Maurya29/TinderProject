import jwt from 'jsonwebtoken'
 export const verifyToken =(token)=>{

    if(token===null){
        return false
    }
    else{
        const result = jwt.verify(token,process.env.SECRET)
        return result
    }

}