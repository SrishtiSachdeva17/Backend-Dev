import fs from 'fs';
//kisi bhi route pe request aane par uska log file me store karne ke liye middleware function
//agr nhi likhenge to hr route pr fs module krna padega
//Request aane par execute hota hai
//Response bhejne se pehle run hota hai
export const loggingMiddleware=(req,res,next)=>{
    let log = `${new Date().toISOString()}-${req.method} ${req.originalUrl}\n`;
    
    fs.appendFile('server.log',log,(err)=>{
        if(err){
            console.log("Error writing to log file:",err);
        }
    });
    next();
}
//new Date().toISOString() y current date aur time btayega
//req.method get/post krega
//req.originalUrl y btayega ki konsa route hirt hua
//next route ko control deta h
//user->middleware->route->response