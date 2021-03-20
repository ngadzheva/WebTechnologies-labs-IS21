const age = require('./age');
const Person = require('./person');

Person.prototype.greeting = function () {
    console.log(`Hello, ${this.name}`)
};

function Student(name, fn, age) {
    Person.call(this, name, age);

    this.fn = fn;

    let _mark;

    this.getMark = () => _mark;

    this.setMark = newMark => _mark = newMark;
}

Student.prototype.studentInfo = function () {
    this.info();
    console.log(` ${this.fn}`);
}

Student.prototype = Person.prototype;

Student.prototype.sayHi = function() {
    console.log(`Hi, ${this.name}`);
};

const gosho = new Student('Ivan', 88888, age.getAge());
gosho.info();
gosho.sayHi();
// gosho.studentInfo(); -> can not access this
gosho.greeting();

const pesho = new Person('Pesho', 23);
pesho.sayHi();

Student.prototype = Object.create(Person.prototype);

Person.prototype.prop = '..';
