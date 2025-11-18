'use strict';

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const usuarioActual = account1;

/////////////////////////////////////////////////
// Funciones auxiliares

containerApp.style.opacity = 100;
labelWelcome.textContent = 'Welcome back';

function crearMovimiento(value, indice) {
  const tipo = value >= 0 ? 'deposit' : 'withdrawal';
  const movimiento = document.createElement('div');
  movimiento.classList.add('movements__row');

  const tipoMovimiento = document.createElement('div');
  tipoMovimiento.classList.add('movements__type');
  tipoMovimiento.classList.add(`movements__type--${tipo}`);
  tipoMovimiento.textContent = indice + ' ' + tipo;

  const valorMovimiento = document.createElement('div');
  valorMovimiento.classList.add('movements__value');
  valorMovimiento.textContent = value + '€';

  movimiento.prepend(tipoMovimiento);
  movimiento.append(valorMovimiento);

  containerMovements.prepend(movimiento);
}



function mostrarMoviientos(movements){

  movements.forEach((movimiento, indice) => {
    crearMovimiento(movimiento, indice);
  });
}


function ordenar(movements){
  const newMovements = [...movements];
  const ordenados = [];
  let mayor;

  while(newMovements.length > 0){
    mayor = newMovements[0];
    for(const movimiento of newMovements){
      if(movimiento > mayor){
        mayor = movimiento;
      }
    }
    if(mayor){
      ordenados.push(newMovements.splice(newMovements.indexOf(mayor), 1)[0]);
    }
  }
  return ordenados;
}

console.log(ordenar(movements));

function userName (cuentas){

  for(const cuenta of cuentas){
    cuenta["userName"] = cuenta.owner
                                .split(" ")
                                .reduce((acc, palabra) =>{
                                  return acc + palabra[0].trim();
                                },"")
                                .toLowerCase();
  }
}

userName(accounts);
console.log(accounts);


function logear(userName, pin){
  
  const userFound = accounts.find(account => account.userName === userName);
  
  if(!userFound){
    alert("Usuario no encontrado");
    return 
  } 
  if(userFound.pin === pin){
    containerApp.style.opacity = 100;
    usuarioActual = userFound;
    return
  }
  alert("Pin incorrecto");
}

logear(usuarioActual, usuarioActual.pin);