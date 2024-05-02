"use strict";
class Animal {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log('My name is' + this.name);
    }
}
class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    bark() {
        console.log('Woof I am a', this.breed);
    }
}
const dog1 = new Dog('Jhony', 'Golden Retriver');
dog1.sayName();
dog1.bark();
//# sourceMappingURL=classExp.js.map