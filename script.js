class Calculator{

  constructor(previusDisplay, currentDisplay) {
    this.currentDisplay = currentDisplay;
    this.previusDisplay = previusDisplay;
    this.operator = undefined
    this.currentNum = "";
    this.previusNum = "";
    this.aux = false;
  }

  clear = function () {
    this.operator = undefined
    this.currentNum = "";
    this.previusNum = "";
    this.aux = false;
  }

  delete = function () {
    if (this.operator != undefined && this.currentNum == "") {
      this.operator = undefined;
      this.currentNum = this.previusNum;
      this.previusNum = ""
    } else {

      this.currentNum = this.currentNum.toString().slice(0, -1)
    }
  }

  addNumber = function (number) {
    if (this.aux && this.operator == undefined) {
      this.currentNum = ""
      this.aux = false;
    }
    if (number === '.' && this.currentNum.includes('.')) return;
    this.currentNum = String(this.currentNum) + String(number);
    
  }

  chooseOperation = function (operator) {
    //if (this.previusNum !== "") {
      this.calculate();
    //}
    if (this.currentNum === "" && this.operator) {
      this.operator = operator;
    }
    if (this.currentNum === "") {
      return
    }

    
    this.operator = operator;
    this.previusNum = this.currentNum;
    this.currentNum = "";
    
  }

  calculate = function () {
    let calc;
    let num1 = parseFloat(this.previusNum);
    let num2 = parseFloat(this.currentNum);
  


    if (isNaN(num1) || isNaN(num2)) return;

    this.aux = true
    
    switch (this.operator) {
      case "+":
        calc = num1 + num2;
        break;
      case "-":
        calc = num1 - num2;
        break;
      case "x":
        calc = num1 * num2;
        break;
      case "÷":
        calc = num1 / num2;
        break;
    
      default:
        break;
    }
    console.log(calc);
    this.currentNum = calc;
    this.operator = undefined;
    this.previusNum = ""
    

  }

  updateDisplay = function () {
    this.currentDisplay.innerText = this.currentNum;


    if (this.operator != undefined) {
      this.previusDisplay.innerText = `${this.previusNum} ${this.operator}`;
    } else {
       this.previusDisplay.innerText = ``;
    }
  }
}





let previus = document.querySelector('[data="prev"]')
let current = document.querySelector('[data="current"]');
let numbers = document.querySelectorAll('[data="number"]');
let operadores = document.querySelectorAll('[data="operator"]');
let del = document.querySelector('[data="delete"]');
let clear = document.querySelector('[data="clear"]');
let equal = document.querySelector('[data="equal"]')



const calculadora = new Calculator(previus, current);

numbers.forEach(number => {
  number.addEventListener('click', () => {
    console.log(number.innerText)
    calculadora.addNumber(number.innerText)
    calculadora.updateDisplay();
  })
})

del.addEventListener('click', () => {
  calculadora.delete()
  calculadora.updateDisplay();
})

clear.addEventListener('click', () => {
  calculadora.clear()
  calculadora.updateDisplay();
})

operadores.forEach(ope => {
  ope.addEventListener("click", () => {
    console.log(ope.innerText);
    calculadora.chooseOperation(ope.innerText)
    calculadora.updateDisplay();
  })
})

equal.addEventListener("click", () => {
  calculadora.calculate()
  calculadora.updateDisplay();
})

window.addEventListener("keydown", (e) => {
  // console.log(e);
  e.defaultPrevented
  if (!document.querySelector(`[key="${e.key}"]`)) return;
  document.querySelector(`[key="${e.key}"]`).click()
 
})