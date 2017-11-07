// run this in node v4 to see the "expected" behavior

this.test = "attached to the module";

var foo = {
    test: "attached to an object"
};

// a method to create methods
foo.method = function (name, cb) {
    this[name] = cb;
};

// use an arrow function and get
// lexical analysis of "this"
foo.method("bar", () => {
    // not what you expected, maybe?
    console.log(this.test);
});

foo.bar();

foo.method("bar", function () {
    // not what you expected, maybe?
    console.log(this.test);
});

foo.bar();