interface Car {
    name: string;
    start(): void;
  }
  
  class Vehicle implements Car {
    name: string;
  
    constructor(name: string) {
      this.name = name;
    }
    start(): void {
      throw new Error("Method not implemented.");
    }
  }
  
  const dog = new Vehicle('Buddy');
  dog.start();
  