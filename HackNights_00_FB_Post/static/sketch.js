// For various colors
var COLORS = [];

// For specific colors
var COLOR_BACKGROUND,
    COLOR_TEXT;

function setup() {
    var myCanvas = createCanvas(max(500,window.innerWidth*0.66), window.innerHeight-32);
	myCanvas.parent('myCanvas');
	frameRate(24);
    smooth();

    textAlign(CENTER,CENTER);
    textSize(64);
    strokeWeight(2);

    COLORS = [color(59,89,152),   color(65,94,155),
              color(98,122,173),  color(109,132,180),
              color(88,144,255),  color(120,170,255),
              color(78,86,101),   color(145,151,163),
              color(216,222,234), color(233,233,250), color(246,247,248)];

    COLOR_BACKGROUND = COLORS[0];
    COLOR_TEXT = COLORS[9];
}

function draw() {
    background(COLOR_BACKGROUND);
    if(myID == ''){
        fill(COLOR_TEXT);
        text("CLICK TO START", 0,0, width,height);
    }
    else{
        translate(width/2,height/2);
        for(var i=0; i<8; i++){
            var minDim = min(width,height);
            stroke(COLOR_TEXT);
            strokeWeight(2);
            noFill();
            arc(0,0, minDim*sin(frameCount/13*TWO_PI/24), minDim*sin(frameCount/7*TWO_PI/24), 0,PI);
            rotate(TWO_PI/8);
        }
    }
}

function mouseClicked(){
    if(myID != ''){
        postCanvasToFB('AWESOME!');
    }
}

function keyPressed(){
    if((myID != '') && (key == ' ')){
        postTextToFB('Hello!');
    }
}

function windowResized() {
    resizeCanvas(max(500,windowWidth*0.66), windowHeight-32);
}
