import fs from "fs"

function registerBook(title, author, price){
    try{
        let book = [];
        let ob = {
            bookid : new Date() , title, author, price,
        }
        if(fs.existsSync("book.json")){
            let data = JSON.parse(fs.readFileSync("book.json","utf-8"))
            let isbook = data.some((value)=> value.title === title)
            if(isbook){
                return "book exists"
            }
            book = data;
        }
        book.push(ob);
    fs.writeFileSync("book.json", JSON.stringify(book , null , 2))
    console.log("book logged");
    }
    catch(error){
        console.log(error);
    }
}
export default registerBook;
