// Домашнее задание(Порешать типовые задачи - написать порядок и вывод в консоли):
// 1)
console.log('1');
setTimeout(() => console.log('2'), 1);
let promiseNew = new Promise((resolve) => {
    console.log('3');
    resolve();
});
promiseNew.then(() => console.log('4'));
setTimeout(() => console.log('5'));
console.log('6');

 // Порядок и вывод в консоли:
'1' // синхронная операция
'3' // синхронная операция
'6' // синхронная операция
'4' // микротаска
'5' // макротаска без задержки
'2' // макротаска с задержкой

// Проговорила бы так:
// Сначала выполняются синхронные операции на 3, 6, 11 строке по порядку.
// Затем стек очищается.
// После того, как промис зарезолвился, выполняется очередь микротасок, здесь задача одна - .then на 9 строке.
// Затем выполняется макрозадача setTimeout без задержки на 10 строке.
// Затем выполняется макрозадача setTimeout с задержкой на 4 строке.

//////////////////////////////



// 2)
let promiseTree = new Promise((resolve, reject) => {
    resolve("a");
    console.log("1");
    setTimeout(() => {
        console.log("2");
    }, 0);
    console.log("3");
});

 // Порядок и вывод в консоли:
'1' //  синхронная операция
'3' // синхронная операция
'2' // макротаска

// Проговорила бы так:
// При создании promise автоматически запустилась функция-аргумент, которая успешно вызвала resolve с результатом "а".
// Выполнилась синхронная операция console.log("1").
// setTimeout записалась в очередь макротасок.
// Выполнилась синхронная операция console.log("3").
// Теперь выполняется макрозадача setTimeout: console.log("2").

/////////////////////////



// 3)
let promiseTwo = new Promise((resolve, reject) => {
    resolve("a");
});
promiseTwo
    .then((res) => {
        return res + "b";
    })
    .then((res) => {
        return res + "с";
    })
    .finally((res) => {
        return res + "!!!!!!!";
    })
    .catch((res) => {
        return res + "d";
    })
    .then((res) => {
        console.log(res);
    });

 // Порядок и вывод в консоли:
'abc' // так как при чейнинге в каждый следующий then переходит результат от предыдущего.
/////////////////////////////



// 4)
function doSmth() {
    return Promise.resolve("123");
}
doSmth()
    .then(function (a) {
        console.log("1", a); //
        return a;
    })
    .then(function (b) {
        console.log("2", b);
        return Promise.reject("321");
    })
    .catch(function (err) {
        console.log("3", err);
    })
    .then(function (c) {
        console.log("4", c);
        return c;
    });


///////////////////////////




// 5)
// console.log("1");
// setTimeout(function () {
//     console.log("2");
// }, 0);
// Promise.resolve().then(() => console.log("3"));
// console.log("4");
////////////////////////////
//7)
// async function a() {
//   console.log("a");
// }

// console.log("1");

// (async function () {
//   console.log("f1");
//   await a();
//   console.log("f2");
// })();
// console.log("2");
////////////////////////////////
//8)
// console.log(1);

// setTimeout(() => console.log(2));

// async function func() {
//   console.log(3);

//   await new Promise((resolve) => {
//     console.log(4);
//     resolve();
//     console.log(5);
//   })
//     .then(() => console.log(6))
//     .then(() => console.log(7));

//   console.log(8);
// }

// setTimeout(() => console.log(9));

// func();

// console.log(10);
///////////////////////////////////
// 9)*
// function foo(callback) {
//     setTimeout(() => {
//         callback('A');
//     }, Math.random() * 100);
// }
// function bar(callback) {
//     setTimeout(() => {
//         callback('B');
//     }, Math.random() * 100);
// }
// function baz(callback) {
//     setTimeout(() => {
//         callback('C');
//     }, Math.random() * 100);
// }
//
// foo(console.log)
// bar(console.log)
// baz(console.log)

// Написать функцию, чтобы починить последовательность выполнения A,B,C без использования колбэк хэлла
// в функциях foo, bar,baz запрещено что-либо менять
// подсказка: нужны промисы =))
