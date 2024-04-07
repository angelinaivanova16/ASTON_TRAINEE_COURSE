//1.
const a = {b: 1},
    c = Object.create(a); // объект c наследуется от объекта a

console.log(c.b); // 1 (c не находит свойство b у себя и берет его у своего прототипа)
delete c.b;
console.log(c.b); // 1 (у c и так не было свойства b)
delete a.b;
console.log(c.b); // undefined (а вот теперь у прототипа удалено свойство b)
a.z = 2;
console.log(c.z); // 2 (так как в прототип добавлено свойство z со значением 2)
c.z = 3;
console.log(a.z); // 2 (у объекта a осталось значение 2 у свойства z)

// 2.
const promise = new Promise(() => {
})
promise.prototype === Promise.__proto__ // false (у объекта promise нет prototype, так как prototype есть только у класса или function, значит promise.prototype = undefined.
// А у объектa Promise __proto__ это  Function.prototype, так как Promise создан с помощью класса new Function)

const obj = {}
obj.__proto__ === Object.prototype // true (так как obj - это объект, а у любого объекта есть __proto__, у объекта, созданного с пом литерала __proto__  равно Object.prototype)

new Array([]).__proto__ === Array.prototype // true (так как __proto__ массива равно Array.prototype)

function Fn1 () {}
function Fn2 () {}
Fn1.constructor === Fn2.constructor // true (так как метод constructor у одной функции всегда равен constructor другой функции)

Fn1.prototype === Fn2.prototype // false (так как prototype - это независимый объект. Один prototype никогда не равен другому prototype)

//3.

// У вас есть два конструктора, Animal и Bird.
// Каждый объект типа Bird должен наследовать метод speak от Animal.
// Однако, Bird также должен иметь свой собственный метод fly.

// Создайте конструктор Animal, который принимает параметр name и устанавливает его как свойство объекта.
// Добавьте метод speak в Animal, который выводит в консоль звук, издаваемый животным (например, "Some generic sound").
// Создайте конструктор Bird, который принимает параметр name и вызывает конструктор Animal с тем же именем.
// Добавьте метод fly в Bird, который выводит в консоль сообщение о том, что птица летит (например, "Flying high!").
// Создайте объекты animal и bird с использованием соответствующих конструкторов и вызовите их методы speak и fly.
// Решите задачу, используя прототипное наследование, чтобы Bird наследовал от Animal.

// Должно быть такое поведение:
// const animal = new Animal("Дженни");
// const bird = new Bird("Воробей");
//
// animal.speak(); // "Some generic sound"
// bird.speak();   // "Some generic sound"
// bird.fly();     // "Flying high!"

class Animal {
  constructor(name) {
    this.name = name
  } 
  speak() {
    console.log("Some generic sound") 
  }
}

class Bird extends Animal {
  constructor(name) {
    super(name);
  }
  fly() {
    console.log("Flying high!")
  }
}

const animal = new Animal("Дженни");
const bird = new Bird("Воробей");

animal.speak(); // "Some generic sound"
bird.speak();   // "Some generic sound"
bird.fly();     // "Flying high!"


// Теперь на функциях:
function Animal(name) {
    this.name = name;
    this.speak = function() {
        console.log("Some generic sound")
    };
}

function Bird(name) {
    this.name = name;
    Animal.call(this, name)
    this.fly = function() {
        console.log("Flying high!")
    };
}

const animal = new Animal("Дженни");
const bird = new Bird("Воробей");

animal.speak(); // "Some generic sound"
bird.speak();   // "Some generic sound"
bird.fly();     // "Flying high!"
