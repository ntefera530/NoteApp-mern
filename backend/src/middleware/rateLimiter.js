import ratelimit from "../config/upstash.js";


const ratelimiter = async (req, res, next) => {

    try{
        const {success} = await ratelimit.limit("my-limit-key");

        if(!success){
            return res.status(429).json({ message: "Rate limit exceeded. Try again later." });
        }

        next();
    }
    catch (error){
        console.error("Error in rate limiter:", error);
        next(error);
    }
}

export default ratelimiter;