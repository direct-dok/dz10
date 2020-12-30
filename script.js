let container = document.querySelector('.container'),
    firstAction = document.querySelector('.wrapper__first-block'),
    secondAction = document.querySelector('.overlay__quest'),
    buttonStart = document.querySelector('.overlay__quest .quest button'),
    innetText = document.querySelector('.overlay__quest .quest p'),
    fieldInputFirst = document.querySelector('.first-number input[name="numberOne"]'),
    fieldInputSecond = document.querySelector('.first-number input[name="numberTwo"]'),
    form = document.querySelector('.first-number'),
    errorData = document.querySelector('.error'),
    minValue,
    maxValue,
    answerNumber,
    orderNumber,
    gameRun,
    answerOptions = ["Вангую, что это", "Погадал на кофейной гуще! Это", "Позвонил Мерилин Керро, она сказала, что это", "Знакомая гадалка говорит, что это цифра", "Скажу наугад, это цифра", "Знатоки отгадали, это цифра"],
    success = ["Я сразу знал", "Это было легко", "Я не я, если не угадаю", "Другого и ожидать нельзя было", "Я красавчик!!"],
    fail = ["Думаю, что Вы не загадали число\n\u{1F92F}", "Я так не играю\n\u{1F92F}", "Побаловались, и хватит\n\u{1F914}", "Что Вы от меня хотите?\n\u{1F914}"], 
    numeralObj = {
        0: 'ноль', 1: 'один', 2: 'два', 3: 'три', 4: 'четыре', 5: 'пять', 6: 'шесть', 7: 'семь', 8: 'восемь', 9: 'девять', 10: 'десять', 11: 'одиннадцать', 12: 'двенадцать', 13: 'тринацать', 14: 'четырнадцать', 15: 'пятнадцать', 16: 'шестнадцать', 17: 'семнадцать', 18: 'восемнадцать', 19: 'девятнадцать', 20: 'двацать', 30: 'тридцать', 40: 'сорок', 50: 'пятьдесят', 60: 'шестьдесят', 70: 'семьдесят', 80: 'восемьдесят', 90: 'девяносто', 100: 'сто', 200: 'двести', 300: 'триста', 400: 'четыреста', 500: 'пятьсот', 600: 'шестьсот', 700: 'семьсот', 800: 'восемьсот', 900: 'девятьсот',
    };

const orderNumberField = document.getElementById('orderNumberField'),
      answerField = document.getElementById('answerField');


window.addEventListener('load', start);

function start(min = 0, max = 0, err = false) {
    container.style.display = 'none';
    (err) ? errorData.innerHTML = `<p>Первое число, должно быть меньше, чем второе. Ваше первое число <span>${min}</span>, а второе <span>${max}</span>, что противоречит правилам игры. Для продолжения игры, установите числа заново</p>`: errorData.innerHTML = '';
    firstAction.style.display = 'flex';
}

form.addEventListener('submit', setValue);

function setValue(e) {
    e.preventDefault();
    minValue = parseInt(fieldInputFirst.value) || 0;
    maxValue = parseInt(fieldInputSecond.value) || 100;
    if(minValue > maxValue) {
        start(minValue, maxValue, true);
    } else {
        minValue = (minValue < -999) ? -999 : minValue;
        maxValue = (maxValue > 1000) ? 999 : maxValue;
        fieldInputFirst.value = fieldInputSecond.value = '';
        answerNumber  = Math.floor((minValue + maxValue) / 2);
        orderNumber = 1;
        gameRun = true;
        orderNumberField.innerText = orderNumber;
        addAnswer(answerNumber);
        innetText.innerHTML = `Загадайте любое целое число, в диапазоне от <span>${minValue}</span> до <span>${maxValue}</span>, а я его угадаю`
        firstAction.style.display = 'none';
        secondAction.style.display = 'flex';
    }
}

buttonStart.addEventListener('click', function() {
    container.style.display = 'block';
    secondAction.style.display = 'none';
});

window.addEventListener('load', start);

document.getElementById('btnRetry').addEventListener('click', start);

document.getElementById('btnLess').addEventListener('click', function() {
    console.log(maxValue, minValue);
    if (gameRun){
        if (maxValue == minValue){
            let phraseRandom = Math.round( Math.random() * 3);
            let answerPhrase = fail[phraseRandom];
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = --answerNumber;
            answerNumber = Math.ceil((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            addAnswer(answerNumber);
        }
    }
});

document.getElementById('btnOver').addEventListener('click', function () {
    console.log(maxValue, minValue);
    if (gameRun){
        if (minValue === maxValue){
            let phraseRandom = Math.round( Math.random() * 3);
            let answerPhrase = fail[phraseRandom];
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = ++answerNumber;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            addAnswer(answerNumber);
        }
    }
})

function addAnswer(numberAnswer) {
    let resultNumber = numberConversion(numberAnswer);
    numberAnswer = (resultNumber.length < 20) ? resultNumber : numberAnswer;
    let random = Math.round(Math.random() * 5);
    answerField.innerText = `${answerOptions[random]} ${numberAnswer}`;
}

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        answerField.innerText = `${success[Math.round(Math.random() * 4)]}\n\u{1F60E}`;
        gameRun = false;
    }
})


function numberConversion(number) {
    let firstNum,
        secondNum, 
        thirdNum, 
        minus = (String(number).includes('-')) ? '- ': '';
        number = (String(number).includes('-')) ? parseInt(String(number).slice(1)) : number;
    if(number < 20) {
        return `${minus}${numeralObj[number]}`;
    } else if(number >= 20 && number < 100) {
        let numStr = String(number);
        firstNum = numeralObj[`${numStr[0]}0`];
        secondNum = (numStr[1] == '0') ? '' : numeralObj[numStr[1]];
        return `${minus}${firstNum} ${secondNum}`;
    } else if(number >= 100) {
        let numStr = String(number);
        if (numStr.slice(1) == '00') {
            return `${minus}${numeralObj[number]}`;
        } else if (numStr[1] == '0') {
            firstNum = numeralObj[`${numStr[0]}00`];
            thirdNum = numeralObj[`${numStr[2]}`];
            return `${minus}${firstNum} ${thirdNum}`;
        } else if (numStr[2] == '0') {
            firstNum = numeralObj[`${numStr[0]}00`];
            thirdNum = numeralObj[`${numStr.slice(1)}`];
            return `${minus}${firstNum} ${thirdNum}`;
        } else {
            firstNum = numeralObj[`${numStr[0]}00`];
            secondNum = numeralObj[`${numStr[1]}0`];
            thirdNum = numeralObj[`${numStr[2]}`];
            return `${minus}${firstNum} ${secondNum} ${thirdNum}`;
        }
    }
}