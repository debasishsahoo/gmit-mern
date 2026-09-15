
const fruits = ["apple","banana","cherry"];

console.log(fruits.includes("banana"));// true
console.log(fruits.includes("grape"));// false

// Practical use
const allowedRoles = ["admin","editor","moderator"];
const userRole = "editor";

if (allowedRoles.includes(userRole)) {
    console.log("Access granted");
}