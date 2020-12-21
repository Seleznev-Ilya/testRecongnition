// Создаем распознаватель

var recognizer = new webkitSpeechRecognition();
var utterance;
var preview;

const img = document.getElementById('img');
const root = document.getElementById('root');
recognizer.interimResults = true;

recognizer.lang = 'ru-Ru';


recognizer.onresult = function (event) {
    var result = event.results[event.resultIndex];
    if (result.isFinal) {

        utterance = new SpeechSynthesisUtterance(`Я почынаю анализ зображення`);
        if (result[0].transcript === 'объект'){
            capture.innerHTML= `<h1>${result[0].transcript}!</h1>`;
            talk();
            // html2canvas(document.querySelector("#capture")).then(canvas => {
            //     preview = appendChild(canvas);
            //     root.preview;
            //     console.log(preview)
            // });
        }
        // alert('Вы сказали: ' + result[0].transcript);
    } else {

        console.log('Промежуточный результат: ', result[0].transcript);
    }
};

var synth = window.speechSynthesis;
utterance = new SpeechSynthesisUtterance(`чэкаю команду старту, по сыгнальному слову. объект`);

function speech() {
    // Начинаем слушать микрофон и распознавать голос
        recognizer.start();
}

function talk() {
    synth.speak(utterance);
}

function doCanvas() {
    // synth.pause();
    html2canvas(document.querySelector("#root")).then(canvas => {
        // preview = appendChild(canvas);
        root.appendChild(canvas);
        preview = canvas;
    });
}

function doUrl() {
    // var reader  = new FileReader();
    // preview.toDataURL()
    // console.log(preview.toDataURL());
    // img = new Image(100,100);
    img.src =preview.toDataURL();

    // return preview.toDataURL();

}

// setTimeout(speech,1000);

function mobNet() {



    (async () => {
        const model  = await mobilenet.load();
        const predictions = await model.classify(img);
        console.log(predictions);

    })();
}