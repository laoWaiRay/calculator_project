const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;
const operate = (operator, a, b) => operator(a,b);

let storage = '0';
let total = 0;
let next = 0;

const activeOperation = [
    {
        name:'add',
        active:false
    }, 
    {
        name:'subtract',
        active:false
    }, 
    {
        name:'multiply',
        active:false
    }, 
    {
        name:'divide',
        active:false
    }
];

let equalsActive = false;


const numInputs = document.querySelectorAll('.calc-input__num');
const display = document.querySelector('.calc-display-inner');
const btnClear = document.querySelector('.btn-clear');
const btnAdd = document.querySelector('.btn-add');
const btnSubtract = document.querySelector('.btn-subtract');
const btnMultiply = document.querySelector('.btn-multiply');
const btnDivide = document.querySelector('.btn-divide');
const btnEquals = document.querySelector('.btn-equals');

const setActiveOperation = (operation) => {
    activeOperation.forEach(obj => obj.active = false);
    activeOperation.find(obj => obj.name === operation).active = true;
}

const isActiveOperator = function(operator){
    return activeOperation.find(obj => obj.name === operator).active;
}

const operatorButtonAction = function(operator) {
    switch(true){
        case equalsActive:
            total = total;
            display.textContent = total;
            break;
        case activeOperation.every(obj => obj.active === false):
            total = parseInt(display.textContent);
            display.textContent = total;
            break;
        case isActiveOperator('add'):
            total = operate(add, total, parseInt(storage));
            display.textContent = total;
            break;
        case isActiveOperator('subtract'):
            total = operate(subtract, total, parseInt(storage));
            display.textContent = total;
            break;
        case isActiveOperator('multiply'):
            total = operate(multiply, total, parseInt(storage));
            display.textContent = total;
            break;
        case isActiveOperator('divide'):
            if(equalsActive === false){
                total = parseInt(display.textContent);
            }
            break;
    }
    storage = '0';
    setActiveOperation(operator);
    equalsActive = false;
} 

numInputs.forEach(num => {
    num.addEventListener('click', (e) => {
        if(equalsActive){
            total = 0;
            storage = '0';
            display.textContent = storage;
            activeOperation.forEach(obj => obj.active = false);
            equalsActive = false;
        }
        if(storage === '0'){
            storage = e.target.textContent;
            display.textContent = storage;
        } else{
            storage += e.target.textContent;
            display.textContent = storage;
        }
        console.log(storage)
    })
})

btnClear.addEventListener('click', () => {
    total = 0;
    storage = '0';
    display.textContent = storage;
    activeOperation.forEach(obj => obj.active = false);
    equalsActive = false;
})

btnAdd.addEventListener('click', ()=>{
    operatorButtonAction('add');
})

btnSubtract.addEventListener('click', ()=>{
    operatorButtonAction('subtract')
})


btnMultiply.addEventListener('click', ()=>{
    operatorButtonAction('multiply');
})


btnDivide.addEventListener('click', ()=>{
    operatorButtonAction('divide');
})

btnEquals.addEventListener('click', ()=>{
   switch(true){
    case activeOperation.find(obj => obj.name === 'add').active:
        total = operate(add, total, parseInt(storage));
        display.textContent = total;
        break;
    case activeOperation.find(obj => obj.name === 'subtract').active:
        total = operate(subtract, total, parseInt(storage));
        display.textContent = total;
        break;
    case activeOperation.find(obj => obj.name === 'multiply').active:
        total = operate(multiply, total, parseInt(storage));
        display.textContent = total;
        break;
    case activeOperation.find(obj => obj.name === 'divide').active:
        total = operate(divide, total, parseInt(storage));
        display.textContent = total;
        break;
   }
   equalsActive = true;
})




