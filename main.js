object = [];
status1 = "";

function setup() {
    canvas = createCanvas(480,380);
    video = createCapture(VIDEO);
    video.size(480,340);
    video.hide();
    canvas.center();
}

function start() {
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects";
search = document.getElementById("object_name").value;
}

function modelLoaded() {
    console.log("Model Loaded");
    status1 = true;
}


function gotResult(error, results) {
    if(error) {console.log(error);

    }
    console.log(results);
    object = results;
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status1 != "") {
        objectdetector.detect(video, gotResult);
        for(i = 0; i < object.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ object.length;
            fill("red");
            percent = floor(object[i].confidence*100);
            text(object[i].label + " "+ percent + "%",object[i].x, object[i].y);
            noFill();
            stroke("red");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);

            if(object[i].label==search){
                video.stop();
                objectdetector.detect(gotResult);
                document.getElementById("status").innerHTML = search + " found";
            synth = window.speechSynthesis;
            utterthis=new SpeechSynthesisUtterance(search+"found");
            synth.speak(utterthis);   
            }
            else{
                document.getElementById("status").innerHTML = search + " not found";
            }
        }
    }
}