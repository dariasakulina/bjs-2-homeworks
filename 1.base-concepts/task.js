"use strict";

function solveEquation(a, b, c) {
    let arr = [];
    let d = b ** 2 - 4 * a * c;

    if (d < 0) {
        return arr;
    } else if (d === 0) {
        let x = -b / (2 * a);
        arr.push(x);
        return arr;
    } else {
        let x1 = (-b + Math.sqrt(d)) / (2 * a);
        let x2 = (-b - Math.sqrt(d)) / (2 * a);
        arr.push(x1, x2);
        return arr;
    }
}

console.log(solveEquation(1, -3, 2));
console.log(solveEquation(1, 2, 1));
console.log(solveEquation(1, 0, 1));

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
    percent = parseFloat(percent);
    contribution = parseFloat(contribution);
    amount = parseFloat(amount);
    countMonths = parseInt(countMonths);

    if (
        isNaN(percent) || isNaN(contribution) ||
        isNaN(amount) || isNaN(countMonths)
    ) {
        return false;
    }

    let monthlyRate = percent / 100 / 12;

    let creditBody = amount - contribution;

    if (creditBody <= 0) {
        return 0;
    }

    let monthlyPayment = creditBody * (monthlyRate + (monthlyRate / ((1 + monthlyRate) ** countMonths - 1)));

    let totalAmount = monthlyPayment * countMonths;

    return Number(totalAmount.toFixed(2));
}

console.log(calculateTotalMortgage(10, 0, 50000, 12));
console.log(calculateTotalMortgage(10, 1000, 50000, 12));
console.log(calculateTotalMortgage(10, 0, 20000, 24));
console.log(calculateTotalMortgage(10, 1000, 20000, 24));
console.log(calculateTotalMortgage(10, 20000, 20000, 24));
console.log(calculateTotalMortgage(10, 0, 10000, 36));
console.log(calculateTotalMortgage(15, 0, 10000, 36));