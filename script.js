window.onload = function(){
    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    let accumulatedValue = 0
    let isAccumulating = false
    let accumulationType = null

    const outputElement = document.getElementById("result")

    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    const btnMult = document.getElementById("btn_op_mult")
    const btnPlus = document.getElementById("btn_op_plus")
    const btnMinus = document.getElementById("btn_op_minus")
    const btnDiv = document.getElementById("btn_op_div")
    const btnClear = document.getElementById("btn_op_clear")
    const btnEqual = document.getElementById("btn_op_equal")

    const btnPlusMinus = document.getElementById("btn_op_plusminus")
    const btnPercent = document.getElementById("btn_op_percent")
    const btnBackspace = document.getElementById("btn_op_backspace")
    const btnSqrt = document.getElementById("btn_op_sqrt")
    const btnSquare = document.getElementById("btn_op_square")
    const btnFactorial = document.getElementById("btn_op_factorial")
    const btnTripleZero = document.getElementById("btn_op_triplezero")
    const btnCube = document.getElementById("btn_op_cube")
    const btnBgColor = document.getElementById("btn_op_bgcolor")
    const btnDisplayColor = document.getElementById("btn_op_displaycolor")
    const btnAccumAdd = document.getElementById("btn_op_accumadd")
    const btnAccumSub = document.getElementById("btn_op_accumsub")

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if (digit !== '.' || (digit === '.' && !a.includes('.'))) {
                a += digit
            }
            outputElement.innerHTML = a || '0'
        } else {
            if (digit !== '.' || (digit === '.' && !b.includes('.'))) {
                b += digit
            }
            outputElement.innerHTML = b || '0'
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    })

    if (btnMult) {
        btnMult.onclick = function() {
            if (a === '') return
            selectedOperation = 'x'
        }
    }

    if (btnPlus) {
        btnPlus.onclick = function() {
            if (a === '') return
            selectedOperation = '+'
        }
    }

    if (btnMinus) {
        btnMinus.onclick = function() {
            if (a === '') return
            selectedOperation = '-'
        }
    }

    if (btnDiv) {
        btnDiv.onclick = function() {
            if (a === '') return
            selectedOperation = '/'
        }
    }

    if (btnClear) {
        btnClear.onclick = function() {
            a = ''
            b = ''
            selectedOperation = null
            expressionResult = ''
            isAccumulating = false
            accumulatedValue = 0
            accumulationType = null
            outputElement.innerHTML = '0'
        }
    }

    if (btnEqual) {
        btnEqual.onclick = function() {
            if (a === '' || b === '' || !selectedOperation)
                return

            switch(selectedOperation) {
                case 'x':
                    expressionResult = (+a) * (+b)
                    break
                case '+':
                    expressionResult = (+a) + (+b)
                    break
                case '-':
                    expressionResult = (+a) - (+b)
                    break
                case '/':
                    if (+b === 0) {
                        outputElement.innerHTML = 'Error'
                        a = ''
                        b = ''
                        selectedOperation = null
                        return
                    }
                    expressionResult = (+a) / (+b)
                    break
                default:
                    break
            }

            a = expressionResult.toString()
            b = ''
            selectedOperation = null
            outputElement.innerHTML = a
        }
    }

    // ===== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ИЗ ЗАДАНИЙ =====

    if (btnPlusMinus) {
        btnPlusMinus.onclick = function() {
            if (a !== '' && a !== '0') {
                a = (parseFloat(a) * -1).toString()
                outputElement.innerHTML = a
            }
        }
    }

    if (btnPercent) {
        btnPercent.onclick = function() {
            if (a !== '') {
                a = (parseFloat(a) / 100).toString()
                outputElement.innerHTML = a
            }
        }
    }

    if (btnBackspace) {
        btnBackspace.onclick = function() {
            if (!selectedOperation && a !== '') {
                a = a.slice(0, -1)
                outputElement.innerHTML = a || '0'
            } else if (selectedOperation && b !== '') {
                b = b.slice(0, -1)
                outputElement.innerHTML = b || '0'
            }
        }
    }

    if (btnBgColor) {
        btnBgColor.onclick = function() {
            const colors = ['#f5f5f5', '#e3f2fd', '#f3e5f5', '#e8f5e9', '#fff3e0']
            const randomColor = colors[Math.floor(Math.random() * colors.length)]
            document.body.style.backgroundColor = randomColor
        }
    }

    if (btnSqrt) {
        btnSqrt.onclick = function() {
            if (a !== '') {
                const num = parseFloat(a)
                if (num >= 0) {
                    a = Math.sqrt(num).toString()
                    outputElement.innerHTML = a
                } else {
                    outputElement.innerHTML = 'Error'
                    a = ''
                }
            }
        }
    }

    if (btnSquare) {
        btnSquare.onclick = function() {
            if (a !== '') {
                const num = parseFloat(a)
                a = (num * num).toString()
                outputElement.innerHTML = a
            }
        }
    }

    if (btnFactorial) {
        btnFactorial.onclick = function() {
            if (a !== '') {
                const num = parseInt(a)
                if (num >= 0 && num <= 170) {
                    let factorial = 1
                    for (let i = 2; i <= num; i++) {
                        factorial *= i
                    }
                    a = factorial.toString()
                    outputElement.innerHTML = a
                } else {
                    outputElement.innerHTML = 'Error'
                    a = ''
                }
            }
        }
    }

    if (btnTripleZero) {
        btnTripleZero.onclick = function() {
            if (!selectedOperation) {
                a += '000'
                outputElement.innerHTML = a
            } else {
                b += '000'
                outputElement.innerHTML = b
            }
        }
    }

    if (btnAccumAdd) {
        btnAccumAdd.onclick = function() {
            if (a !== '') {
                if (!isAccumulating) {
                    isAccumulating = true
                    accumulationType = 'add'
                    accumulatedValue = parseFloat(a)
                } else if (accumulationType === 'add') {
                    accumulatedValue += parseFloat(a)
                } else {
                    accumulatedValue = parseFloat(a)
                    accumulationType = 'add'
                }
                a = accumulatedValue.toString()
                outputElement.innerHTML = a
                b = ''
                selectedOperation = null
            }
        }
    }

    if (btnAccumSub) {
        btnAccumSub.onclick = function() {
            if (a !== '') {
                if (!isAccumulating) {
                    isAccumulating = true
                    accumulationType = 'subtract'
                    accumulatedValue = parseFloat(a)
                } else if (accumulationType === 'subtract') {
                    accumulatedValue -= parseFloat(a)
                } else {
                    accumulatedValue = parseFloat(a)
                    accumulationType = 'subtract'
                }
                a = accumulatedValue.toString()
                outputElement.innerHTML = a
                b = ''
                selectedOperation = null
            }
        }
    }

    if (btnDisplayColor) {
        btnDisplayColor.onclick = function() {
            const colors = ['#f5f5f5', '#ffebee', '#e3f2fd', '#f3e5f5', '#e8f5e9']
            const randomColor = colors[Math.floor(Math.random() * colors.length)]
            outputElement.style.backgroundColor = randomColor
        }
    }

    if (btnCube) {
        btnCube.onclick = function() {
            if (a !== '') {
                const num = parseFloat(a)
                a = (num * num * num).toString()
                outputElement.innerHTML = a
            }
        }
    }
}
