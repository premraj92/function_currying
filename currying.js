// So what is currying ??
    // Currying or Function Currying is a Functional Programming technique where we convert a normal function declaration/expression that accepts multiple arguments into an version with multiple nested functions where each function accepts only one argument & return an anonymous function

    // so you can chain the function calls as shown in the curried implementation below

    // The no of anonymous nested functions being returned is roughly same as the No of arguments being passed in as Input
    // the last/innermost nested function performs some computation with all the arguments the outer functions in the scope chain received, before it returns the result
    // This technique is only possible because of the concepts of Lexical Scope & Closures in Javascript

// A very basic Normal function Implementation
function sum (a, b, c) {
    return a + b + c
}

// A Curried implementation of the same function above
function sumCurried (a) {
    // debugger
    return function (b) {
        // debugger
        return function (c) {
            // debugger
            return a + b + c
        }
    }
}

console.log(sumCurried(5)(10)(15))

// now if you see the above function sumCurried when each inner/nested function is returned, the outer function that returned it `is popped off the call stack` & its execution context that `contains the local variables && arguments passed to it is destroyed`

// so that means at any moment during each nested function call (for example here three function calls are there) only that functions & data should remain for ex: when the first inner nested function that has argument 'b' should not have access to argument 'a' from outer function that is already destroyed

// But it does ?? why ?? - Closures !!!

// Closures allow the INNER function to retain the outer function's local variables & arguments passed to it (i.e. Retains the OUTER function's STATE) EVEn AFTER the said OUTER function is destroyed




// lets implement the above function currying with ES6 Arrow functions
const sumCurriedArrow = (a) => (b) => (c) => a + b + c

console.log(sumCurriedArrow(5)(10)(15))







// Partial Application/Functions
// Partial application is similar to Currying but it breaks one important rule of currying i.e. every function in a curried implementation should accept only one argument

function product (a) {
    return function (b, c) {
        return a * b* c
    }
}

console.log(`Multiply function implemented with Partial application/function technique `, product(10)(5, 6))

// here with the above example as you can see the first/outer function accepts only single argument 'a' but inner function accepts two arguments - this pattern is what we call Partial application
// Its different from Currying but related & this pattern also is possible only because of Closures



// Some use cases of Function Currying in real world


// When you can't/won't pass all the data needed to implement the full function logic at once as shown below

const user = {
    firstName : 'John',
    lastName: 'Doe',
    city: 'Austin'
}

// function getUserFirstName (user) {
//     return user?.firstName
// }

// function getUserLastName (user) {
//     return user?.lastName
// }

// console.log(getUserFirstName(user))
// console.log(getUserLastName(user))


// The above logic works but its very ineffecient
// How do we restructure it - very simple

function getUserDetail(user, key) {
    return user[key]
}

console.log(getUserDetail(user, 'firstName'))
console.log(getUserDetail(user, 'lastName'))
console.log(getUserDetail(user, 'city'))


// Now the above function is definitely more reusable than the one before it but its still not clear why do we need currying ??
// lets say you wanna only want to pass one parameter that changes everytime like the key/propertyName that changes in the above function but avoid passing the static object/data itself

const getUserDetailCurried = (user) => (key) => user[key]

// we are storing the first function call's return value here which is also a function
const userData = getUserDetailCurried(user)

console.log(userData('firstName'))
console.log(userData('lastName'))
console.log(userData('city'))




// Now we may have a question this useCase does not look very useful to use currying - that's true

// But Imagine you may get this userData after the data is loaded from some API call triggered by a first event
// And you don't want to store this data in the global scope because you either wanna keep it private OR you wanna keep your function access to access data userData('firstName') as a PURE Function when you are using Functional Programming than this Currying is the way to go.
// here due to Closures after `const userData = getUserDetailCurried(user)` the inner function returned/stored in userData will still have access to the outerFunction argument of 'user' thus maintaing a private scope for the userData

// Simply put when you get the data first & than after sometime you get some More data in those scenarios Currying is very helpful





// Currying can also be helpful when working with DOM manipulations
// here we are passing the id of element to select in first function & actual content in the inner function
// So if you have to select the element once & store it reference first
// && than change the value/content of the element multiple times in future & you want keep the reference private & functions pure as discussed above this makes sense

function updateNode(id) {
    return function (content) {
        return document.querySelector(`#${id}`).innerText = content
    }
}

// Arrow func implementation of above updateNode func
const updateNodeTwo = (id) => (content) => document.querySelector(`#${id}`).innerText = content






// Infinite Currying
// i.e. there is no fixed number of arguments but your curried implementation should repeat the action for 'n' no of elements
// like sum(a)(b)(c)(d)(..)(n)

function sumInfinteCurried(a) {
    return function(b) {
        // implementing an ifinite currying with this recursive function call
        if(b) return sumInfinteCurried(a + b)

        // base case
        return a
    }
}

console.log(sumInfinteCurried(2)(3)(10)(20)(75)())