module.exports = class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    info() {
        console.log(`${this.name} ${this.age}`);
    }
}
