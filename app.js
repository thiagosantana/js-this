//Just for Event examples section
const EventEmitter = require('events');
class MyEmitter extends EventEmitter { }

//Global Scope
/*
    In this first example, 'this' refers to a place that is a origin of a call
*/
let myFunction = function () {
    console.log(this);
}
myFunction(); //Prints a NODE Global Scope

console.log('----');

//Object Literal
/*
    In this second example, 'this' also refers to a place that is a origin of a call,
    but in this case the origin of an invoke is the myObject.
*/
let myObject = {};
myObject.someMethod = function () {
    console.log(this);
}
myObject.someMethod(); // Prints myObject

console.log('----');

//Prototypes and Constructors
/*
    Same case from above
*/
let anotherObject = function () {
    this.someMethod = function () {
        console.log(this);
    }
}
let obj = new anotherObject();
obj.someMethod(); // Prints anotherObject

console.log('----');

let anotherObject2 = function () {
    this.someMethod = function () {
        console.log(this);
    }
}
anotherObject2.prototype = {
    someProtoMethod: function () {
        console.log(this);
    }
}
let a = new anotherObject2();
a.someMethod(); // Prints anotherObject2
a.someProtoMethod(); // Prints anotherObject2

console.log('----')

//Events
let eventHandler = function () {
    console.log(this);
}
const myEventEmitter = new MyEmitter();
myEventEmitter.on('fancyEvent', eventHandler);
myEventEmitter.emit('fancyEvent'); //Prints MyEmitter
eventHandler(); //Prints NODE Global Scope

console.log('----');

//Dynamic this (call and apply)

let theFunction = function () {
    console.log(this);
}
theFunction.call(); //Without params, theFunction is invoked from the node
let numbers = [
    {
        name: 'Thiago'
    },
    {
        name: 'Livia'
    },
    {
        name: 'Frida'
    }
];
for (let i = 0; i < numbers.length; i++) {
    console.log(this); // Prints {}
}
numbers.forEach(() => {
    console.log(this); // Prints Node's Scope
});

for (let i = 0; i < numbers.length; i++) {
    (function () {
        console.log(this); // numbers Objects
    }).call(numbers[i]); //Set a new scope
}

numbers.forEach(function () {
    console.log(this); // this = Array [{ name: 'Mark' },{ name: 'Tom' },{ name: 'Travis' }]
}, numbers); // BOOM, scope change!