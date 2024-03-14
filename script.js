'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
  
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}$</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner

      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);

const calcPrintBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};
calcPrintBalance(account1.movements);

const calcdisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}$`;

  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}$`;

  const instrest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = instrest;
};
calcdisplaySummary(account1.movements);

let currentaccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('LOGIN');
  // the default behavior of a form element is to refresh itself once the
  // submit character is clicked
  // but the prevent default prevents it from submitting the form
  currentaccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentaccount);
  if (currentaccount?.pin === Number(inputLoginPin.value)) {
    console.log('Login');
  }
});
// we need to find the account from the accounts array that the user inputed

//0ur aim here was to to get the firstletter of each word in the name

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];
// this is the slice the slice string method
// this also does not mutate the array but instead it makes a new array that has been slice
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
//this is use mostly to create shallow copies of arrays
console.log(arr.slice());
// this is use mostly to create shallow copies of arrays
console.log([...arr]);

//SPICE\
//spice method is practically the same with the slice method.. the only difference
// is that the slice method mutates the original array
// whatever operation is done from the splice changes the originsl srrsy

//console.log(arr.splice(2));
arr.splice(1, 2);
console.log(arr);
console.log(1, 2);
//in the splice method the second parameters works a bit different
//then in the slice method
// the second parameter is the number of elements you want delete starting from the
// the first parameter index
console.log(arr);

//REVERSEE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);
// this reverse function does mutate the array

//CONCAT
// this is used to concatanate two arrays together
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);
//this two give use the same result

//JOIN
console.log(letters.join('-'));
// this does the same thing with the join method
// it joins the arrays using -

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}; You deposited ${movement}`);
  } else {
    console.log(`Movement ${i - 1}: You withdrew ${Math.abs(movement)} `);
    //absolute value removes the sign
  }
}
//FOR EACH
// the for each method requires a callback function,,
// it loops ovet the arrays  and for each iteration it executes the condition
// for the for each method there are a couple alterations
// in the for of loop the counter variable is the first variable named
// but in the for method the counter argument is named after the counter variable
// the last variable is the array that is being used
// NOTE....
// continue and break operations cannot be used the for each method
console.log('----FOREACH----');
movements.forEach(function (movement, i, array) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}; You deposited ${movement}`);
  } else {
    console.log(`Movement ${i - 1}: You withdrew ${Math.abs(movement)} `);
    //absolute value removes the sign
  }
});

//F0R EACH WITH MAPS AND SETS

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
//currenciesUnique.forEach(function (value, value, map) {
// console.log(`${value} : ${value}`);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value} : ${value}`);
});
// a set doesnt have key because a set has no indexes
// therfore the function cannot execute
// we use a thowaway variable which is like ba useless varauble in javascript usually reprented with _
*/
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

//const movementsUSD = movements.map(function (mov) {
// return mov * eurToUsd;
//});
//console.log(movementsUSD);

//const movementsUSDfor = [];
//for (const mov of movements) movementsUSD.push(mov * eurToUsd);
//console.log(movementsUSDfor);

//const movementsUSD = movements.map(mov => mov * eurToUsd);

movements.forEach(function (mov, i, array) {
  console.log(mov, i);
});
const movementDescriptions = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementDescriptions);

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
//This will filter out the condition in the function..and store it in the deposit function

console.log(movements);
console.log(deposits);

const depositFor = [];
for (const mov of movements) if (mov > 0) depositFor.push(mov);
console.log(depositFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
//REDUCE METHOD
//WITH THE REDUCE METHOD WE Can basically boil down all the elements
//single value
console.log(movements);

// the reduxe method is a little bit different from the rest .. its jas an accumulator
//arguement

const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);
// the acc argument is like a snowball that keeps adding the current iteration insttruction to itself
// the last value tthere is the starting point
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

const maxwell = [2, 4, 5, 5, 5, 6];
const maxwell2 = maxwell.reduce((acc, cur) => acc + cur, 0);
console.log(maxwell2);

const max = movements.reduce((acc, cur) => {
  if (acc > cur) return acc;
  else return cur;
}, movements[0]);
console.log(max);

const eurToUsd1 = 1.1;
const totalDepositUSD = movements
  .filter(mov => mov < 0)
  .map(mov => mov * eurToUsd1)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUSD);
// sometimes with this methos we might get a few errors.. based on the fact
//that we cannot actually see the outcome of the methods.. but there is a certain way we can
// do it.. we can use the arr argument.. we can long the arr argument in the second metho

const myfriends = ['chesky', 'ningz', 'maf', 'j-bo'];

const newfriends = myfriends.map(letter => letter.slice(-1));
console.log(newfriends);

//THE FIND METHOD

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
