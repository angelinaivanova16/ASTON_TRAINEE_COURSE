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
'abc' // сначала сработает console.log на 76 строчке. Тут abc, так как при чейнинге в каждый следующий then переходит результат от предыдущего.
Promise {<fulfilled>: undefined} // потом .then вернет объект промис, так как когда не пишем явно return, это значит: return undefined. Промис выполнился успешно с результатом undefined в последней строчке.


// finally не сработает, finally не получает аргументов, так как нельзя определить, будет ли промис выполнен успешно или с ошибкой.
// catch не сработает, так как нет ошибки.
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

// Порядок и вывод в консоли:
'1' '123' // сначала сработает console.log на 96 строчке, так как на 92 строке промис выполнился успешно с результатом "123".
'2' '123' // затем сработает console.log на 100 строчке "123", так как при чейнинге в каждый следующий then переходит результат от предыдущего.
'3' '321' // затем сработает catch и console.log на 104 строчке "321", так как предыдущий then вернул промис с ошибкой "321", что вызвало catch.
'4' undefined // catch выполнился, поэтому цепочка восстанавливается, но в then возвращается resolve(undefined)
Promise {<fulfilled>: undefined} // потом .then вернет объект промис с результатом undefined

///////////////////////////




// 5)
console.log("1");
setTimeout(function () {
    console.log("2");
}, 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");

// Порядок и вывод в консоли:
'1' // синхронная операция
'4' // синхронная операция
'3' // микротаска
'2' // макротаска
////////////////////////////



//7)
async function a() {
  console.log("a");
}

console.log("1");

(async function () {
  console.log("f1");
  await a();
  console.log("f2");
})();
console.log("2");

// Порядок и вывод в консоли:
'1' // синхронная операция
'f1' // синхронная операция в самовызывающейся анонимной функции
'a' // вызовали функцию а, в которой синхронный console.log("a")
'2' // синхронная операция
'f2' // асинхронная микрозадача после await
////////////////////////////////



//8)
console.log(1);

setTimeout(() => console.log(2));

async function func() {
  console.log(3);

  await new Promise((resolve) => {
    console.log(4);
    resolve();
    console.log(5);
  })
    .then(() => console.log(6))
    .then(() => console.log(7));

  console.log(8);
}

setTimeout(() => console.log(9));

func();

console.log(10);

// Порядок и вывод в консоли:
1 // синхронная операция
3 // после вызова функции func выполняеся синхронный console.log(3)
4 // синхронная операция
5 // синхронная операция (тут важно, что 180 строка заблокируется, так как микрозадачи приостанавливают выполнение функции до тех пор, пока промис не будет разрешен)
10 // синхронная операция
6 // микрозадача
7 // микрозадача
8 // синхронная операция в функции, которая была заблокирована очередью предыдущих микротасок здесь же.
2 // макрозадача
9 // макрозадача

///////////////////////////////////



// 9)*
// Написать функцию, чтобы починить последовательность выполнения A,B,C без использования колбэк хэлла
// в функциях foo, bar,baz запрещено что-либо менять
// подсказка: нужны промисы =))
function foo(callback) {
    setTimeout(() => {
        callback('A');
    }, Math.random() * 100);
}
function bar(callback) {
    setTimeout(() => {
        callback('B');
    }, Math.random() * 100);
}
function baz(callback) {
    setTimeout(() => {
        callback('C');
    }, Math.random() * 100);
}

// Мое новое решение:
const promisify = (f) => { // создаю функию, которая вернет промис, с которым можно выполнять последовательные then (в параметр будем передавать наши функции foo, bar, baz)
    return new Promise(resolve, reject) {
        f((char) => { // вызываем функцию, передавая ей колбэк с параметром, которым станут наши буквы.
            resolve(char) // резолвим промис с результатом - буквой из первоначальной функции(foo, bar или baz)
        })
    }
}

promisify(foo) // вызываю promisify, передавая в нее первую нашу функцию
    .then((char)=> {  // когда промис зарезолвится, вывожу в консоль его результат - букву из первой функции.
        console.log(char)
        return promisify(bar) // возвращаю функцию с новым параметром для следующего then
    })
    .then((char)=> {
            console.log(char)
            return promisify(baz)
        })
    .then((char)=> {
            console.log(char)
        })



// Мое костыльное решение:
// const delay = (time) => {
//    return new Promise((resolve, reject) => setTimeout(resolve, time))
// }

// delay(100)
// .then(() => {
//     foo(console.log)
//     return delay(100)
// })
// .then(() => {
//     bar(console.log)
//     return delay(100)
// })
// .then(() => {
//     baz(console.log)
// })
