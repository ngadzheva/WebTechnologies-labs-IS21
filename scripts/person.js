const age = require('./age');

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
