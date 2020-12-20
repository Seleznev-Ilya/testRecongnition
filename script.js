/*
// let grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
let recognition = new webkitSpeechRecognition();
// let speechRecognitionList = new SpeechGrammarList();
// speechRecognitionList.addFromString(grammar, 1);
// recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'ru-Ru';
// recognition.interimResults = false;
// recognition.maxAlternatives = 1;

let diagnostic = document.querySelector('.output');
let bg = document.querySelector('html');

document.body.onclick = function () {
    recognition.start();
    console.log('Ready to receive a color command.');
};

recognition.onresult = function (event) {
    let color = event.results[0][0].transcript;
    diagnostic.textContent = 'Result received: ' + color;
    bg.style.backgroundColor = color;
};*/

var recognizer = new webkitSpeechRecognition();

// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = true;

// Какой язык будем распознавать?
recognizer.lang = 'ru-Ru';

// Используем колбек для обработки результатов
recognizer.onresult = function (event) {
    var result = event.results[event.resultIndex];
    if (result.isFinal) {
        alert('Вы сказали: ' + result[0].transcript);
    } else {
        console.log('Промежуточный результат: ', result[0].transcript);
        root.innerHTML =  result[0].transcript;
    }
};
function speech () {
    // Начинаем слушать микрофон и распознавать голос
    recognizer.start();
}

var synth = window.speechSynthesis;
var utterance = new SpeechSynthesisUtterance('How about we say this now? This is quite a long sentence to say.');

function talk () {
    synth.speak (utterance);
}

function stop () {
    synth.pause();
}