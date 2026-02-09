import fs from "fs";
const path = "doc.txt";

export function readFile() {  

  if (!fs.existsSync(path)) {
    console.log("File not found");
    return;
  }

  const data = fs.readFileSync(path, "utf-8");
  console.log("File Content:\n" + data);
}

export function writeFile() {
  const content = "Hello from Node JS";

  fs.writeFileSync(path, content);

  console.log("File written successfully");
}

export function copyFile() {    
  const copy = "copy.txt"; 

  if (!fs.existsSync("doc.txt")) {
    console.log("Source file not found");
    return;
  }

  fs.copyFileSync("doc.txt",copy);

  console.log("File copied successfully");
}

export function deleteFile() {

  if (!fs.existsSync("copy.txt")) {
    console.log("File not found");
    return;
  }

  fs.unlinkSync("copy.txt");
  console.log("File deleted");
}

export function listFile() {
  const file = fs.readdirSync(".");
  console.log("File is in this folder:");

  file.forEach(file => {
    console.log(file);
  });
}