// path-demo.js

const path = require("path");

// path.join combines path segments with the correct separator
const filePath = path.join("users","john","documents","report.txt");
console.log("Joined path:", filePath);
// On Unix: users/john/documents/report.txt
// On Windows: users\john\documents\report.txt

// path.resolve creates an absolute path
const absolutePath = path.resolve("src","index.js");
console.log("Absolute path:", absolutePath);
// /home/user/projects/module7/src/index.js

// path.basename returns the last portion of a path (the file name)
console.log("Base name:", path.basename("/home/user/app.js"));
// app.js

// path.basename with extension removal
console.log("Base name without ext:", path.basename("/home/user/app.js",".js"));
// app

// path.dirname returns the directory portion of a path
console.log("Directory:", path.dirname("/home/user/app.js"));
// /home/user

// path.extname returns the file extension
console.log("Extension:", path.extname("report.txt"));
// .txt
console.log("Extension:", path.extname("archive.tar.gz"));
// .gz

// path.parse breaks a path into its components
const parsed = path.parse("/home/user/documents/report.txt");
console.log("Parsed path:", parsed);
// {
//   root: '/',
//   dir: '/home/user/documents',
//   base: 'report.txt',
//   ext: '.txt',
//   name: 'report'
// }

// path.format does the opposite of parse
const formatted = path.format({
    dir:"/home/user",
    base:"app.js"
});
console.log("Formatted path:", formatted);
// /home/user/app.js

// path.isAbsolute checks if a path is absolute
console.log("Is absolute /home/user:", path.isAbsolute("/home/user"));
// true
console.log("Is absolute ./src:", path.isAbsolute("./src"));
// false