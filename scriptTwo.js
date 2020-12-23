// Создаем распознаватель

let recognizer = new webkitSpeechRecognition();
let utterance;
let preview;

const img = document.getElementById('img');
const root = document.getElementById('root');
const capture = document.getElementById('capture');
recognizer.interimResults = true;

recognizer.lang = 'ru-Ru';


recognizer.onresult = function (event) {
    let result = event.results[event.resultIndex];
    if (result.isFinal) {

        utterance = new SpeechSynthesisUtterance(`Распознавание объекта запущено!`);
        if (result[0].transcript === 'снимок'){
            talk();
            snapshot();
            setTimeout(mobNet, 1010);


            // capture.innerHTML= `<p></p>`
            capture.innerHTML= `<p>Команда:<b> ${result[0].transcript}</b>. Подтверждена</p>`;

        }else {
            // speech();
            recognizer.onresult()
        }
        // alert('Вы сказали: ' + result[0].transcript);
    } else {
        capture.innerHTML= `<p>${result[0].transcript}</p>`;
        console.log('Промежуточный результат: ', result[0].transcript);
    }
};

let synth = window.speechSynthesis;
utterance = new SpeechSynthesisUtterance(`Ожидаю команду, снимок, что бы начать анализ изображения`);

function speech() {
    recognizer.start();
}

function talk() {
    synth.speak(utterance);
}


function mobNet() {
    (async () => {

        try {
            const model  = await mobilenet.load();
            const predictions = await model.classify(img);
            console.log(predictions);
            while (predictions){
                if (predictions){
                    capture.innerHTML= `На изображении:<h1><b>${predictions[0].className}</b></h1> <br> или ${predictions[1].className} <br> или ${predictions[2].className}`;
                    utterance = new SpeechSynthesisUtterance(`На изображении обнаружено объект, ${predictions[0].className}, или ${predictions[1].className},  или ${predictions[2].className}`);
                    talk();
                    setTimeout(() => location.reload(), 30000);
                    break;
                }
            }
        } catch (e) {
            console.log(e);
        }
    })();
}

setTimeout(talk,500);
// setTimeout(speech,500);
setTimeout(speech,5000);
// talk();

Webcam.set({
    width: 350,
    height: 450,
    image_format: 'jpeg'
});
Webcam.attach("camera");

function snapshot() {
    openAddNew();
    setTimeout(openAddNew,2000);
    setTimeout(()=>{
        Webcam.snap(
            function (data_uri) {
                // root.innerHTML = '<img class="imgSnap" src="' + data_uri + '">';
                img.src = data_uri;
            }
        );
    },1000);

}



// function doCanvas() {
//     // synth.pause();
//     html2canvas(document.querySelector("#root")).then(canvas => {
//         // preview = appendChild(canvas);
//         root.appendChild(canvas);
//         preview = canvas;
//     });
// }

// function doUrl() {
//     // var reader  = new FileReader();
//     // preview.toDataURL()
//     // console.log(preview.toDataURL());
//     // img = new Image(100,100);
//     try {
//         img.src =preview.toDataURL();
//     }
//     catch (e) {
//         console.log('url error')
//     }
//
//
//
//     // return preview.toDataURL();
//
// }