
const age = 20;

//logic check? true : false
const status = age>= 18 ? "Adult" : "Minor";
console.log(status);// "Adult"

// Equivalent if-else:
let status2;
if (age>= 18) {
    status2= "Adult";
}else {
    status2= "Minor";
}

// Ternary can be used inline
console.log(`User is ${age >= 18 ? "an adult" : "a minor"}`);

// Nested ternary (use sparingly — can hurt readability)
const score = 85;
const grade = score>= 90 ? "A" : score>= 80 ? "B" : score>= 70 ? "C" : "F";
console.log(grade);// "B"