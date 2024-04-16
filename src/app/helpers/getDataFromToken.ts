import { NextRequest } from "next/server"
import jwt, {JwtPayload} from "jsonwebtoken"

// return type of getDataFromToken
interface TokenData {
    id: string | null,
    role: string | null,
}

const getDataFromToken = (request: NextRequest): TokenData => {
    // check token presence
    const authToken = request.cookies.get('authToken');
    
    // if no token present
    if(!authToken){
        console.log("No authToken present")
        return {
            id: null,
            role: null
        }
    }

    // token verification
    let verifiedToken = null
    try {
        verifiedToken = jwt.verify(authToken.value, process.env.JWT_SECRET!) as JwtPayload
        const role: string = verifiedToken?.role
        const id: string = verifiedToken?.id
        return {
            id,
            role
        }
    } catch (error) {
        console.log("error in token verification")
        return {
            id: null,
            role: null
        }
    }


}

export default getDataFromToken;

