Webcam.set({
    width: 500,
    height: 300,
    image_format: 'png',
    png_quality: 95
});

var div = document.getElementById("web");

Webcam.attach('#web');

function pictureTaken() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="camera" src="' + data_uri + '"/>';
    });
}

console.log('ml5', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Atgds8SaO/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model has loaded');
}

function check() {
    img = document.getElementById("camera");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("resultObject").innerHTML = results[0].label;
        document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}