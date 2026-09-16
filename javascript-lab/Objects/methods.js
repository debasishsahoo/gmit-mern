
const calculator = {
    add:function(a,b) {
        return a+ b;
    },
    subtract:function(a,b) {
        return a- b;
    },
    // Shorthand method syntax
    multiply(a,b) {
        return a* b;
    }
};

console.log(calculator.add(5,3));// 8
console.log(calculator.subtract(10,4));// 6
console.log(calculator.multiply(3,7));// 21