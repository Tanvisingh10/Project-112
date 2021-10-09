Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
    });
    
    camera = document.getElementById("camera");
    Webcam.attach('#camera');
    
    function take_snapshot(){
        Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">'
        });
    }
    
    console.log('ml5 version:', ml5.version);
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/CWxsxnYlj/model.json', modelLoaded);
    
    function modelLoaded(){
        console.log('Model Loaded!!');
    }

    function speak(){
        var synth = window.speechSynthesis;
        speak_data_1 = "The gesture is" + gesture;
        var utterThis = new SpeechSynthesisUtterance(speak_data_1);
        synth.speak(utterThis);
    }
    function check(){
        img = document.getElementById('captured_image');
        classifier.classify(img, gotResult);
    }
    
    function gotResult(error, results){
        if (error){
            console.error(error);
        }
        else{
            console.log(results);
            document.getElementById("result_gesture_name").innerHTML = results[0].label;
            gesture = results[0].label;
            speak();
            if(results[0].label == "Stop"){
                document.getElementById("update_gesture").innerHTML = "&#9995;";
            }
            if(results[0].label == "Rocking"){
                document.getElementById("update_gesture").innerHTML = "&#129304;";
            }
            if(results[0].label == "Call me"){
                document.getElementById("update_gesture").innerHTML = "🤙";
            }
            if(results[0].label == "Peace"){
                document.getElementById("update_gesture").innerHTML = "&#9996;";
            }
            if(results[0].label == "Indicating luck"){
                document.getElementById("update_gesture").innerHTML = "🤞";
            }
            if(results[0].label == "Amazing"){
                document.getElementById("update_gesture").innerHTML = "&#128076;";
            }
            if(results[0].label == "Dislike"){
                document.getElementById("update_gesture").innerHTML = "&#128078;";
            }
            if(results[0].label == "Best"){
                document.getElementById("update_gesture").innerHTML = "&#128077;";
            }
        }
    }