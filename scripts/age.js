function Age(age) {
    this.age = age;
}

Age.prototype.getAge = function () {
    return this.age;
}

const age = new Age(22);

module.exports = age;
