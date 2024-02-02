import jwt from "jsonwebtoken"

export const generateToken = (id) => {
    return jwt.sign({id}, "onile123",{
        expiresIn: '30d'
    })
    }