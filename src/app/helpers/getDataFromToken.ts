import { NextRequest } from "next/server"
import jwt, {JwtPayload} from "jsonwebtoken"

interface TokenData {
    id: Number | null,
    role: string | null,
}

const getDataFromToken = (request: NextRequest) => {
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
        const id = verifiedToken?.id
        console.log(`id from gdata is : ${id} and type ${typeof id}`)

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
