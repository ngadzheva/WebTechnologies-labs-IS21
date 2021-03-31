// const studentFn = student.fn;
// const { name, fn } = student;

// const arr = [1, 2, 3, 4, 5];
// const [ fisrt, second, third ] = arr;
// // first -> 1, second -> 2, third -> 3
// const [ , second, third, , fifth] = arr;
// // second -> 2, third -> 3, fifth -> 5
// const a = 5;
// const b = 6;
// [ b, a ] = [ a, b ];

const { age } = require('./age');

const student = {
    name: 'Student Name',
    fn: 74236,
    age: 22
};

function Person(name, age) {
    this.name = name;
    this.age = age;

    this.info = () => console.log(`${this.name} ${this.age}`);
}

Person.prototype.greeting = function () {
     console.log(`Hello, ${this.name}`)
};

const person = new Person('Person', age.getAge());
person.info();
person.name;

const maria = new Person('Maria', 22); 
/*
 maria = {
    name: 'Maria',
    age: 22
 }
*/
maria.greeting();

const ivan = new Person('Ivan', 22);
ivan.greeting = () => console.log('Hello there');

ivan.greeting();
maria.greeting();

module.exports = function (name, age) {
    this.name = name;
    this.age = age;

    this.info = () => console.log(`${this.name} ${this.age}`);
};
