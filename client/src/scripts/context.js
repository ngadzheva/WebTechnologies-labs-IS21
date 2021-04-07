// // number string boolean undefined null NaN
// // Object

// const numbers = [undefined, 1, 2, 3, 4, 'five', true];
// const person = {
//     age: 22,
//     name: 'Person Name'
// };
// person['age']; // 22
// person.name; // Person Name

// function add(a, b) {
//     return a + b;
// }

// add(5, 6); // 11

// const addNumbers = add;
// addNumbers(8, 7); // 15

// const arrowFunction = () => console.log("Arrow function example");
// arrowFunction();

name = 'Super Global';
const pesho = { age: 22, name: 'Pesho' };
const gosho = { age: 21, name: 'Gosho' };
const ivan = { age: 23, name: 'Ivan' };

const sayHi = function() {
    console.log(`Hi, I am ${this.name}`);
};

sayHi();

pesho.sayHi = sayHi;
pesho.sayHi();

sayHi.call(gosho);
pesho.sayHi.apply(ivan);

const student = {
    name: 'Student',
    fn: 88888,
    info: function() {
        console.log(`${this.name}, ${this.fn}`)
    }
};

student.info();

const info = student.info;
info();

const bindedInfo = student.info.bind(student);
bindedInfo();

const greeting = () => console.log(`Hello, ${this.name}`);
greeting();
ivan.greeting = greeting;
ivan.greeting();
ivan.greeting.apply(ivan);
