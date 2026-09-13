
const temperature = 35;

if (temperature> 30) {
    console.log("It is hot outside");
}



const age1 = 16;

if (age1>= 18) {
    console.log("You can vote");
}else {
    console.log("You cannot vote yet");
}


const score = 75;

if (score>= 90) {
    console.log("Grade: A");
}else if (score>= 80) {
    console.log("Grade: B");
}else if (score>= 70) {
    console.log("Grade: C");
}else if (score>= 60) {
    console.log("Grade: D");
}else {
    console.log("Grade: F");
}
// Output: Grade: C


const day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of the work week");
        break;
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
        console.log("Midweek");
        break;
    case "Friday":
        console.log("Almost weekend");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend");
        break;
    default:
        console.log("Invalid day");
}
// Output: Start of the work week



const fruit = "apple";

switch (fruit) {
    case "apple":
        console.log("Apple selected");
        // No break — falls through to the next case
    case "banana":
        console.log("Banana selected");
        break;
    case "cherry":
        console.log("Cherry selected");
        break;
}
// Output:
// Apple selected
// Banana selected


const age2 = 25;
const hasLicense = true;
const hasInsurance = true;

if (age2>= 18 && hasLicense&& hasInsurance) {
    console.log("You can drive");
}else if (age2>= 18 && hasLicense) {
    console.log("You need insurance");
}else if (age2>= 18) {
    console.log("You need a license and insurance");
}else {
    console.log("You are too young to drive");
}


function classifyBMI(weight,height) {
    const bmi = weight/ (height* height);

    if (bmi< 18.5) {
        return "Underweight";
    }else if (bmi< 25) {
        return "Normal weight";
    }else if (bmi< 30) {
        return "Overweight";
    }else {
        return "Obese";
    }
}

console.log(classifyBMI(70,1.75));// "Normal weight"
console.log(classifyBMI(50,1.75));// "Underweight"
console.log(classifyBMI(100,1.75));// "Obese"