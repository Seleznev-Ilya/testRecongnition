let recognizer = new webkitSpeechRecognition();

// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = true;

// Какой язык будем распознавать?
recognizer.lang = 'ru-Ru';

// Используем колбек для обработки результатов
recognizer.onresult = function (event) {
    let result = event.results[event.resultIndex];
    if (result.isFinal) {
        alert('Вы сказали: ' + result[0].transcript);
    } else {
        console.log('Промежуточный результат: ', result[0].transcript);
    }
};

function speech () {
    // Начинаем слушать микрофон и распознавать голос
    recognizer.start();
}

let synth = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance('Hallow World Bitch.');
function talk () {
    synth.speak (utterance);
}

function stop () {
    synth.pause();
}