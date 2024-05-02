"use strict";
class Vehicle {
    constructor(name) {
        this.name = name;
    }
    start() {
        throw new Error("Method not implemented.");
    }
}
const dog = new Vehicle('Buddy');
dog.start();
//# sourceMappingURL=interface.js.map