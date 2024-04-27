// //1
const user = {
    name: 'Bob',
    funcFunc() {
        return function() {
            console.log(this);
        }
    },
    funcArrow() {
        return () => {
            console.log(this);
        }
    },
    arrowFunc: () => {
        return function() {
            console.log(this);
        }
    },
    arrowArrow: () => {
        return () => {
            console.log(this);
        }
    },
};

user.funcFunc()(); // будет ссылаться на глобыльный объект global/window
user.funcArrow()(); // будет ссылаться на объект user
user.arrowFunc()(); // будет ссылаться на глобыльный объект global/window
user.arrowArrow()(); // будет ссылаться на глобыльный объект global/window



// 2
var poke1 = {name:'Pikachu'};
var poke2 = {name:'Chermander'};
var poke3 = {name:'Bulbasaur'};

var sayName = function(){ console.log(this.name) }

sayName.bind(poke1).bind(poke2).call(poke3); // Pikachu, так как байндить контекст можно только 1 раз


// 3
const obj = {
    firstName: 'Bill',
    lastName: 'Ivanov',

    showFirstName: function () {
        console.log(this.firstName);
    },

    showLastName: () => {
        console.log(this.lastName);
    }
}

obj.showFirstName(); // Bill
obj.showLastName(); // undefined, так как this у стрелочной функции нет, ссылается на глоб.объект, в котором нет свойства lastName

obj.showFirstName.bind({ firstName: 'Boris' })(); // Boris
obj.showFirstName.bind({ firstName: 'Boris' }).bind({ firstName: 'Oleg' })(); // Boris , так как байндить контекст можно только 1 раз

obj.showLastName.bind({ lastName: 'Boris' })(); // undefined, так как стрелочная функция


// 4

// const user = {
//     name: 'Mike',
//     fn: function () {
//         console.log(this.name)
//     }
// }
//
// setTimeout(user.fn, 1000)

// Что будет выведено в консоль после истечения таймаута и почему? 
// this потеряется. Так как когда метод передаётся отдельно от объекта – this теряется. setTimeout получил функцию fn отдельно от объекта user, то есть функция потеряла контекст.

// Сделайте так, чтоб починить и выводило "Mike"
const user = {
    name: 'Mike',
    fn: function () {
        console.log(this.name)
    }
}

let fn = user.fn.bind(user);

setTimeout(fn, 1000)


// Подсказка - ответ найдете в 5 ссылке README

// 5
//Исправьте cтроку(***), чтобы всё работало (других строк изменять не надо, кроме password, чтобы проверить if else).
//
function askPassword(ok, fail) {
  let password = 'rockstar2'
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'Вася',

  loginOk() {
    console.log(`${this.name} logged in`);
  },

  loginFail() {
    console.log(`${this.name} failed to log in`);
  },

};

askPassword(user.loginOk.bind(user), user.loginFail.bind(user)) //***;
