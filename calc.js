class Calculator {
    constructor(preText, postText) {
        this.preText = preText
        this.postText = postText
        this.clear()
    }
    clear() {
        this.postDisplay = ''
        this.preDisplay = ''
        this.operation = undefined
    }

    delete() {
        this.postDisplay = this.postDisplay.toString().slice(0, -1)
    }
    appendNumber(number){
        if (number === '.' && this.postDisplay.includes('.')) return
        this.postDisplay = this.postDisplay + number
    }
    appendOperator(operation){
        if (this.postDisplay === '') return
        if (this.preDisplay !== '') {
            this.compute()
        }
        this.operation = operation
        this.preDisplay = this.postDisplay
        this.postDisplay = ''

    }
    compute(){
        let computated
        const previous = parseFloat(this.preDisplay)
        const posteriour = parseFloat(this.postDisplay)
        if (isNaN(previous) || isNaN(posteriour)) return // isNaN = is not a number
        switch (this.operation) {
            case '+':
                computated = previous + posteriour
                break;
            case '-':
                computated = previous - posteriour
                break;
            case '*':
                computated = previous * posteriour
                break;
            case '/':
                computated = previous / posteriour
                break;
            default:
                return
        }
        this.postDisplay = computated
        this.operation = undefined
        this.preDisplay = ''

    }
    updateDisplay(){
        this.postText.innerText = this.postDisplay
        this.preText.innerText = this.preDisplay
        if (this.operation != null) {
            this.preText.innerText = `${this.preDisplay} ${this.operation}`
        }
    }
}
const numberButton = document.querySelectorAll('[data-number]')
const operatorButton = document.querySelectorAll('[data-operator]')
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const preText = document.querySelector('[data-pre]')
const postText = document.querySelector('[data-post]')

const calculator =  new Calculator(preText,postText)
numberButton.forEach(button => {
    button.addEventListener('click',() => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()


    })
}
)
operatorButton.forEach(button => {
    button.addEventListener('click',() => {
        calculator.appendOperator(button.innerText)
        calculator.updateDisplay()
    })
})
// incorporating the functions with the buttons in the html
equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
