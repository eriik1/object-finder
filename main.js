video=""
objects=[]
statusmodel=""
function preload(){
video=createVideo('video.mp4')
}
function setup(){
    canvas=createCanvas(480,380)
    canvas.center()
    video.hide()
}
function start(){
    objectdetector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="status:detactingobject"
}
function modelLoaded(){
    console.log("modelisloaded")
    statusmodel=true
    video.loop()
    video.speed(1)
    video.volume(0)
}
function draw(){
    image(video,0,0,480,380)
    if(statusmodel!=""){
        objectdetector.detect(video,gotresult)
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status:objectsdected"
            document.getElementById("numberofobject").innerHTML="numberofobjectsare"+objects.length
            fill("blue")
            percent=floor(objects[i].confidence*100)
            noFill()
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15)
            stroke("black")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
}
function gotresult(error,results){
if(error){
    console.log(error)
}    
else{
    console.log(results)
    objects=results
}
}

