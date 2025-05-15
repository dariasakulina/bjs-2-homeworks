function parseCount(value) {
    const parsed = Number.parseFloat(value);
    if (isNaN(parsed)) {
        throw new Error("Невалидное значение");
    }
    return parsed;
}

function validateCount(value) {
    try {
        return parseCount(value);
    } catch (error) {
        return error;
    }
}

console.log(validateCount("123.45"));
console.log(validateCount("abc"));

class Triangle {
    constructor(a, b, c) {
        if (
            a + b <= c ||
            a + c <= b ||
            b + c <= a
        ) {
            throw new Error("Треугольник с такими сторонами не существует");
        }
        this.a = a;
        this.b = b;
        this.c = c;
    }

    get perimeter() {
        return this.a + this.b + this.c;
    }

    get area() {
        const p = this.perimeter / 2;
        const area = Math.sqrt(
            p * (p - this.a) * (p - this.b) * (p - this.c)
        );
        return +area.toFixed(3);
    }
}

function getTriangle(a, b, c) {
    try {
        return new Triangle(a, b, c);
    } catch (error) {
        return {
            get perimeter() {
                return "Ошибка! Треугольник не существует";
            },
            get area() {
                return "Ошибка! Треугольник не существует";
            }
        };
    }
}

const triangle1 = getTriangle(3, 4, 5);
console.log(triangle1.perimeter);
console.log(triangle1.area);

const triangle2 = getTriangle(1, 1, 10);
console.log(triangle2.perimeter);
console.log(triangle2.area);