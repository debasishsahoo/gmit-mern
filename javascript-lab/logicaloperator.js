const age = 25;
const hasID = true;

// AND (&&) — true only if BOTH operands are true
console.log(age>= 18 && hasID);// true
console.log(age>= 18 && !hasID);// false
// OR (||) — true if AT LEAST ONE operand is true
console.log(age>= 18 || hasID);// true
console.log(age< 18 || hasID);// true
console.log(age< 18 || !hasID);// false

// NOT (!) — inverts the boolean value
console.log(!true);// false
console.log(!false);// true
console.log(!hasID);// false

console.log(false && "hello");



// AND short-circuits: if the first operand is falsy, it returns it without evaluating the second
console.log(false && "hello");// false
console.log("" && "hello");// "" (empty string is falsy)
console.log("hi" && "hello");// "hello" (first is truthy, so returns second)

// OR short-circuits: if the first operand is truthy, it returns it without evaluating the second
console.log(true || "hello");// true
console.log("hi" || "hello");// "hi"
console.log("" || "hello");// "hello" (first is falsy, so returns second)
console.log(undefined || "default");// "default"

// Practical use: providing default values
const username = "" || "Anonymous";
console.log(username);// "Anonymous"

// Nullish coalescing operator (??) — similar to || but only checks for null/undefined
const value1 = 0 ?? "default";
console.log(value1);// 0 (0 is not null or undefined)

const value2 = null ?? "default";
console.log(value2);// "default"

const value3 = undefined ?? "default";
console.log(value3);// "default"