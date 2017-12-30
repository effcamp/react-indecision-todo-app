class Person {
    constructor(name = 'Anonymous', age = 0) {
        this.name = name;
        this.age = age;
    }
    getGreeting() {
        return `Hi! I'm ${this.name}.`;
    }
    getDescription() {
        return `${this.name} is ${this.age} ${this.age === 1 ? 'year' : 'years'} old`;
    }

}

class Student extends Person {
    constructor(name, age, major) {
        super(name, age);
        this.major = major;
    }
    hasMajor() {
        return !!this.major;
    }
    getDescription() {
        let description = super.getDescription();
        if (this.hasMajor()) {
            description += ` Their major is ${this.major}.`;
        }
        return description;
    }
}

class Traveler extends Person {
    constructor(name, age, location) {
        super(name, age);
        this.location = location;
    }
    getGreeting() {
        let greeting = super.getGreeting();
        if (this.location) {
            greeting += ` I'm visiting from ${this.location}.`
        }
        return greeting;
    }
}

const me = new Student('Fred', 27, 'Computer Science');
console.log(me.getDescription());


const other = new Student();
console.log(other.getDescription());


const andrew = new Traveler('Andrew', 29, 'Philly');
console.log(andrew.getGreeting());

