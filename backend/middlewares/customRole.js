const asyncHandler =require("express-async-handler")

const customRole=(...roles)=>{
    return asyncHandler(( req, res, next )=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({success: false, message:"You are not allowed to access this resource"});
                //throw new Error("You are not allowed for this resource")
        }
        next()
    })
}

module.exports={customRole}