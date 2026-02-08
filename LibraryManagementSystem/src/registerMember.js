import fs from "fs"

function registerMember(name, membershipType){
    try{
        let member = [];
        let ob = {
            memberid : new Date(), name, membershipType,
        }
        if(fs.existsSync("member.json")){
            let data = JSON.parse(fs.readFileSync("member.json","utf-8"))
            let isUser = data.some((value)=> value.name === name)
            if(isUser){
                return "member exists"
            }
            member = data;
        }
        member.push(ob);
    fs.writeFileSync("member.json", JSON.stringify(member , null , 2))
    console.log("member registered");
    }
    catch(error){
        console.log(error);
    }
}
export default registerMember;