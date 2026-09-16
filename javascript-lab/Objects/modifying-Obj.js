const student = {
    name:"Alice",
    age:20
};
// Add a property
student.course= "MERN";
student["email"]= "alice@example.com";

// Update a property
student.age= 21;

// Delete a property
delete student.email;

console.log(student);
// { name: "Alice", age: 21, course: "MERN" }