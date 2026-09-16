const student = {
    name:"Alice",
    age:20,
    course:"MERN"
};

console.log(Object.keys(student));
console.log(Object.values(student));
console.log(Object.entries(student));
for (const [key,value]of Object.entries(student)) {
    console.log(`${key}: ${value}`);
}
const defaults = { theme:"light", language:"en",
     fontSize:14 };
const userPrefs = { theme:"dark", fontSize:16 };
const settings = Object.assign({}, defaults, 
    userPrefs);
console.log(settings);

const settings2 = {...defaults,...userPrefs };
console.log(settings2);

console.log("name" in student);
console.log("email" in student);
console.log(student.hasOwnProperty("name"));








