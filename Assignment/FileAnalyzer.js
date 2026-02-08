import fs from "fs";

export default function analyzeLog() {
  let error = 0;
  let warning = 0;
  let info = 0;

  const stream = fs.createReadStream("doc.txt", "utf-8");

  stream.on("data", (chunk) => {
    const lines = chunk.split("\n");

    for (let line of lines) {
      if (line.includes("ERROR")) error++;
      if (line.includes("WARNING")) warning++;
      if (line.includes("INFO")) info++;
    }
  });

  stream.on("end", () => {
    const report =
      "Errors: " + error + "\n" +
      "Warnings: " + warning + "\n" +
      "Info: " + info;

    fs.writeFileSync("report.txt", report);
    console.log("Report created!");
  });
}
