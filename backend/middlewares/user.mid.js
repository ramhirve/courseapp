import jwt from "jsonwebtoken"

function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization; //check token in header(hai ya nahi)
  

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ errors: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_USER_PASSWORD) //token verify
        req.userId=decoded.id;
        console.log(decoded)
        next();

    } catch (error) {
        return res.status(401).json({ errors: "Invalid token or expired" })
        
    }
    
    
}

export default userMiddleware;