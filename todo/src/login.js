import fs from "fs"

function loginUser(email, password,){
    if(fs.existsSync("todo.json")){
                let data = JSON.parse(fs.readFileSync("todo.json","utf-8"))
                let isUser = data.some((value)=> value.email === email && value.password === password)
                if(isUser){
                    return "user exist"
                }
                else{
                    return "user does not exist"
                }
                
}
}
export default loginUser;