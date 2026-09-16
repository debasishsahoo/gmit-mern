const students = [
    { name:"Alice", grade:92 },//T
    { name:"Bob", grade:78 }, //F
    { name:"Charlie", grade:85 },// T
    { name:"Diana", grade:95 },//T
    { name:"Eve", grade:65 }//F
];
// Get names of students who scored above 80, 
// sorted alphabetically
const honorRoll = students
    .filter(student => student.grade>= 80)
    .map(student => student.name)
    .sort();

console.log(honorRoll);

// Calculate average
// grade of passing students (pass grade >= 70)
const passingStudents = students.filter
(s => s.grade>= 70);

const averageGrade = passingStudents.reduce(
    (sum,s)=> sum+ s.grade,0)/ passingStudents.length;
console.log(averageGrade);