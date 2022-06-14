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

const checkDisplayOutputLength = () => {
    if (total.toString().length > 16){
        display.textContent = total.toFixed(14);
        return true;
    }
}

const updateDisplay = (inputSource) => {
    if(equalsActive){
        total = 0;
        storage = '0';
        display.textContent = storage;
        activeOperation.forEach(obj => obj.active = false);
        equalsActive = false;
    }
    if(storage === '0'){
        storage = inputSource;
        display.textContent = storage;
    } else if (storage.length > 15){
        console.log(storage)
        return
    } else if (storage.includes('.') && inputSource === '.'){
        console.log(storage)
        return
    } else{
        storage += inputSource;
        display.textContent = storage;
    }
    console.log(storage)
}

const operatorButtonAction = function(operator) {
    switch(true){
        case equalsActive:
            total = total;
            checkDisplayOutputLength();
            display.textContent = total;
            break;
        case activeOperation.every(obj => obj.active === false):
            total = parseFloat(display.textContent);
            checkDisplayOutputLength();
            display.textContent = total;
            break;
        case isActiveOperator('add'):
            total = operate(add, total, parseFloat(storage));
            checkDisplayOutputLength();
            display.textContent = total;
            break;
        case isActiveOperator('subtract'):
            total = operate(subtract, total, parseFloat(storage));
            checkDisplayOutputLength();
            display.textContent = total;
            break;
        case isActiveOperator('multiply'):
            total = operate(multiply, total, parseFloat(storage));
            checkDisplayOutputLength();
            display.textContent = total;
            break;
        case isActiveOperator('divide'):
            if(equalsActive === false){
                total = parseFloat(display.textContent);
            } else {
                total = operate(divide, total, parseFloat(storage));
                checkDisplayOutputLength();
                display.textContent = total;
                break;
            }
    }
    storage = '0';
    setActiveOperation(operator);
    equalsActive = false;
} 

numInputs.forEach(num => {
    num.addEventListener('click', (e) => {
        updateDisplay(e.target.textContent)
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
    case activeOperation.every(obj => obj.active === false):
            total = parseFloat(display.textContent);
            checkDisplayOutputLength();
            if(checkDisplayOutputLength() === true) break;
            display.textContent = total;
            break;
    case activeOperation.find(obj => obj.name === 'add').active:
        total = operate(add, total, parseFloat(storage));
        checkDisplayOutputLength();
        if(checkDisplayOutputLength() === true) break;
        display.textContent = total;
        break;
    case activeOperation.find(obj => obj.name === 'subtract').active:
        total = operate(subtract, total, parseFloat(storage));
        checkDisplayOutputLength();
        if(checkDisplayOutputLength() === true) break;
        display.textContent = total;
        break;
    case activeOperation.find(obj => obj.name === 'multiply').active:
        total = operate(multiply, total, parseFloat(storage));
        checkDisplayOutputLength();
        if(checkDisplayOutputLength() === true) break;
        display.textContent = total;
        break;
    case activeOperation.find(obj => obj.name === 'divide').active:
        if(storage === '0'){
            display.textContent = 'Cannot divide by 0';
            break;
        }
        total = operate(divide, total, parseFloat(storage));
        checkDisplayOutputLength();
        if(checkDisplayOutputLength() === true) break;
        display.textContent = total;
        break;
   }
   equalsActive = true;
})

document.addEventListener('keydown', (e) => {
    console.log(e.key)
    switch(true){
        case e.code === 'Digit1':
            updateDisplay(e.key);
            break;
        case e.code === 'Digit2':
            updateDisplay(e.key);
            break;
        case e.code === 'Digit3':
            updateDisplay(e.key);
            break;
        case e.code === 'Digit4':
            updateDisplay(e.key);
            break;
        case e.code === 'Digit5':
            updateDisplay(e.key);
            break;
        case e.code === 'Digit6':
            updateDisplay(e.key);
            break;
        case e.code === 'Digit7':
            updateDisplay(e.key);
            break;
        case e.code === 'Digit8':
            updateDisplay(e.key);
            break;
        case e.code === 'Digit9':
            updateDisplay(e.key);
            break;
        case e.code === 'Digit0':
            updateDisplay(e.key);
            break;
        case e.code === 'Backspace':
            storage = storage.slice(0,-1);
            if (display.textContent.length === 1) {
                if (display.textContent != '0') {
                    storage = '0';
                    display.textContent = storage;
                }
                return
            }
            display.textContent = storage;
    }
})




