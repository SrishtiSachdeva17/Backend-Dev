import fs from "fs";


fs.readFile("log.txt", "utf-8", (error, data) => {
    if (error) {
        console.log("Error reading the file");
        return;
    }

   
    const words = data.trim().split(" ");
    const wordCount = words.length;

    
    fs.writeFile("wordcount.txt", `Total words: ${wordCount}`, (error) => {
        console.log("Word count written successfully!");
    });
});
