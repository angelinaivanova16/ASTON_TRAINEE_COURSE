// Неявное преобразование типов
console.log(NaN + 1 + null + 1); // NaN
console.log(NaN + 1 + null + 1 + ""); // 'NaN'
console.log("" + NaN + 1 + null + 1 + ""); // 'NaN1null1'
console.log("number" + 15 + 3); // 'number153'
console.log(true + false); // 1
console.log([] + null + 1); // 'null1'
console.log("foo" + + "bar"); // 'fooNaN'
console.log(!!"false" == !!"true"); // true
console.log(null == ''); // false
console.log([] == ![]); // true

// Логические операторы
console.log("a" && "b" && "c"); // 'c'
console.log("a" || "b" || "c"); // 'a'
console.log("a" && "" && "c"); // ''
console.log("a" && "" || "c"); // 'c'
console.log("" ?? "a"); // ''
console.log(null ?? "a"); // 'a'

// Всплытие

var a = 1;

function foo() {
    console.log(a);
}

function bar() {
    var a = 2;
    foo();
}

bar(); // 1
////////////////////

function foo(a) {
    if (a > 0) {
        let a = a + 10
        return a
    }
    return a
}
console.log(foo(15)) // ошибка, так как переменная 'a'  в блоке if еще не инициализирована, а мы уже хотим ее использовать.
////////////////////

function giveMeX(showX) {
    if(showX) {
        let x = 5;
    }
    return x;
}

console.log(giveMeX(false)); // ошибка, x не ициализирована.
console.log(giveMeX(true)); // ошибка, x не ициализирована, у let блочная обл видимости.
