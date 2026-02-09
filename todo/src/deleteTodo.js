import fs from "fs"
function deleteTodo(name){
    try{
            if(fs.existsSync("todo.json")){
                let data = JSON.parse(fs.readFileSync("todo.json","utf-8"))
                for(let i = 0; i<data.length; i++){
                    if(data[i].name === name && data.length>0){
                        delete data[i].todo.pop()
                    }
                }
                fs.writeFileSync("todo.json", JSON.stringify(data,null,2))
                
            }
        }
    catch(error){
        console.log(error);
    }
}
export default deleteTodo;