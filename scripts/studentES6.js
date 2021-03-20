const Person = require('./personES6');

class Student extends Person {
    constructor(name, fn, age) {
        super(name, age);
        this.fn = fn;

        let _mark;

        this.getMark = () => _mark;
        this.setMark = newMark => _mark = newMark;
    }

    studentInfo() {
        super.info();
        console.log(`${fn}`);
    }
}

const maria = new Student('Maria', 88888, 22);
