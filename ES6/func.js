//-------------Function declaration---------------
function addMessage(element, message) {
    var messageElement = document.createElement("li");
    messageElement.textContent = message;
    element.appendChild(messageElement);
}

addMessage(first, "Page loading!");



//Function within a function decelaration

function ninja(type) {
    function plainOldJSNinja() {
        return "JS Ninja!!"
    }

    function nodeJSNinja() {
        return "NodeJS Ninja!!"
    }

    return type === "nodeJS" ? nodeJSNinja() : plainOldJSNinja();
}

log(ninja("nodeJS"));
log(ninja());

//---------- Function expression -------------

var myfunc = function () { };

//newFunction(function () {});

(function nameFunction() {
    log("Named function")
})();

+function () {
    log("IIFE function");// Immediatly invoked function expression
}();

-function () {
    log("IIFE function works with uniary operators: +-!~");// Immediatly invoked function expression
}();

//Remember to use () at the end of the function

//-------------Arrow functions------------

var values = [7, 3, 8, 1, 0, 2];
values.sort((value1, value2) => value1 - value2);
log("Sorted array: " + values);


var hello = (name) => {
    return "Hello " + name;
};

log(hello("Preet"));

//-----------Default Parameters

function greet(name, greetings = "Hello") {
    log(greetings + ", " + name);
}

greet("Star", "Howdy");
greet("Star");