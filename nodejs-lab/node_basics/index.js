// fs-demo.js

const fs = require("fs");

// --- Writing files ---

// writeFileSync is synchronous (blocking)
// The program waits until the write is complete before moving on
fs.writeFileSync("example.txt","Hello, this is line one.\nThis is line two.");
console.log("File written successfully (sync)");

// writeFile is asynchronous (non-blocking)
// The program continues immediately; the callback runs when writing is done
fs.writeFile("async-example.txt","Written asynchronously", (error)=> {
    if (error) {
        console.error("Error writing file:", error.message);
        return;
    }
    console.log("File written successfully (async)");
});

console.log("This line runs before the async write completes");


// --- Reading files ---

// readFileSync is synchronous
const contentSync = fs.readFileSync("example.txt","utf-8");
console.log("File content (sync):", contentSync);

// readFile is asynchronous
fs.readFile("example.txt","utf-8", (error,content)=> {
    if (error) {
        console.error("Error reading file:", error.message);
        return;
    }
    console.log("File content (async):", content);
});


// --- Checking if a file exists ---

if (fs.existsSync("example.txt")) {
    console.log("example.txt exists");
}


// --- Getting file information ---

const stats = fs.statSync("example.txt");
console.log("File size:", stats.size,"bytes");
console.log("Is file:", stats.isFile());
console.log("Is directory:", stats.isDirectory());
console.log("Created:", stats.birthtime);


// --- Creating a directory ---

if (!fs.existsSync("my-folder")) {
    fs.mkdirSync("my-folder");
    console.log("Directory created");
}


// --- Listing files in a directory ---

const files = fs.readdirSync(".");
console.log("Files in current directory:", files);


// --- Appending to a file ---

fs.appendFileSync("example.txt","\nThis line was appended.");
console.log("Content appended");


// --- Deleting a file ---

// fs.unlinkSync("async-example.txt");
// console.log("File deleted");