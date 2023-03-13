lwristx = ""
rwristx = ""
lwristy = ""
rwristy = ""
lwristscore = 0
statusleft = ""
rwristscore = 0
statusright = ""

function setup(){
    canvas = createCanvas(600,500)
    canvas.center()

    camera = createCapture(VIDEO)
    camera.hide()

    model = ml5.poseNet(camera , modelLoaded)
    model.on('pose' , gotPoses)
}

function draw(){
    image(camera,0,0,600,500)

    fill("purple")
    stroke("purple")

    statusleft = music1.isPlaying()
    statusright = music2.isPlaying()

    if(lwristscore > 0.2){
        circle(lwristx,lwristy,20)
        music2.stop()

        if(statusleft == false){
            music1.play()
            document.getElementById("song").innerHTML = "Song Name: Pirrates Of the Caribbean"
        }
    }

    if(rwristscore > 0.2){
        circle(rwristx,rwristy,20)
        music1.stop()

        if(statusright == false){
            music2.play()
            document.getElementById("song").innerHTML = "Song Name: Harry Potter Theme"
        }
    }
}

function preload(){
    music1 = loadSound("potc.mp3")
    music2 = loadSound("hp.mp3")
}

function modelLoaded(){
    console.log("Model Has been loaded.")
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results)

        lwristscore = results[0].pose.keypoints[9].score
        console.log("left wrist score = " + lwristscore)

        rwristscore = results[0].pose.keypoints[10].score
        console.log("right wrist score = " + rwristscore)

        lwristx = results[0].pose.leftWrist.x
        lwristy = results[0].pose.leftWrist.y
        rwristx = results[0].pose.rightWrist.x
        rwristy = results[0].pose.rightWrist.y

        console.log("left wrist x = " + lwristx + " , left wrist y = " + lwristy)
        console.log("right wrist x = " + rwristx + " , right wrist y = " + rwristy)
    }
}