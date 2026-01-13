import jwt from "jsonwebtoken";
const isAuth=async(req,res,next)=>{
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(401).json({message: "User Does Not Have Valid Token" });
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!verifyToken){
            return res.status(400).json({ message: "User Does Not Have Valid Token" });
        }
        req.userId = verifyToken.id;
        next()

    } catch (error) {
        console.error("isAuth middleware error");
        return res.status(500).json({ message: `isAuth error ${error}` });
    }   
}
export default isAuth;