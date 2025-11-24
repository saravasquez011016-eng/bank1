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
const formTransfer = document.querySelector(".form--transfer")
const btnTransfer = document.querySelector(".form__btn--transfer")

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
let usuarioActual = account1;
const btnSort = document.querySelector(".btn--sort")
const userTransfer = document.querySelector(".form__input--to");
const amountToTransfer = document.querySelector(".form__input--amount");
const amountToLoan = document.querySelector(".form__input--loan-amount");
// const confirmUser = document.querySelector(".")
// const confirmPin = document.querySelector(".")

/////////////////////////////////////////////////
// Funciones auxiliares

// containerApp.style.opacity = 100;
// labelWelcome.textContent = 'Welcome back';



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
  containerMovements.innerHTML = ""
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
      if(movimiento < mayor){
        mayor = movimiento;
      }
    }
    if(mayor){
      ordenados.push(newMovements.splice(newMovements.indexOf(mayor), 1)[0]);
    }
  }

  return ordenados;
}

const modificar = {
  saldo : () => {labelBalance.textContent = saldoActual() + "€"},
  in : () => {labelSumIn.textContent = usuarioActual.movements.reduce((acc, valor) => valor > 0 ? acc + valor : acc) + "€"},
  out : () => {labelSumOut.textContent = usuarioActual.movements.reduce((acc, valor) => valor < 0 ? acc + valor : acc)* -1 + "€"},
  interest : () => {labelSumInterest.textContent = saldoActual() * usuarioActual.interestRate + "€"}
}

function saldoActual(){
  return usuarioActual.movements.reduce((acc, valor) => acc + valor, 0)
}

function balance(usuario){
  modificar.saldo()
  modificar.in()
  modificar.out()
  modificar.interest()
}


function transferir(){
  const toTransfer = userTransfer.value;
  const value = Number(amountToTransfer.value);
  const user = accounts.find(acount => acount.userName === toTransfer);

  if(!user){
    alert("No encontramos el usuario");
  } else if(value <= 0 || !value){
    alert("No puede enviar esa cantidad");
  } else if(saldoActual() < value){
    alert("Saldo insuficiente")
  } else {
    usuarioActual.movements.push(-value);
    user.movements.push(value);
    mostrarMoviientos(usuarioActual.movements)
    modificar.saldo();
    modificar.out();
    modificar.interest();
  }

}

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
    labelWelcome.textContent = `Welcome back ${usuarioActual.owner.split(" ")[0]}`;
    balance(usuarioActual)
    return
  }
  alert("Pin incorrecto");
}

logear(usuarioActual.userName, usuarioActual.pin);


let ordenadoSiONo = false;
btnSort.addEventListener("click", () =>{

  if(!ordenadoSiONo){
  mostrarMoviientos(ordenar(usuarioActual.movements))
  ordenadoSiONo = true;
  } else {
    mostrarMoviientos(usuarioActual.movements);
    ordenadoSiONo = false;
  }

})

mostrarMoviientos(usuarioActual.movements)


formTransfer.addEventListener("submit", e => {
  e.preventDefault();
})


btnTransfer.addEventListener("click", transferir)

btnLogin.addEventListener("click", () => {
  logear(inputLoginUsername.value, Number(inputLoginPin.value));
})