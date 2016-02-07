// For various colors
var COLORS = [];

// For specific colors
var COLOR_BACKGROUND,
    COLOR_TEXT;

var bLoadedPicture = false;
var mProfilePicture = null;
var currentSize = 4;

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
    if(!bLoadedPicture){
        background(COLOR_BACKGROUND);
        fill(COLOR_TEXT);
        text("CLICK TO START", 0,0, width,height);
    }
    else if(mouseIsPressed){
        noStroke();
        ellipse(mouseX,mouseY,currentSize,currentSize);
        currentSize *= 1.1;
    }
}

function getProfilePicture(url){
    mProfilePicture = loadImage(url, function(img){
        bLoadedPicture = true;
        resizeCanvas(img.width, img.height);
        image(mProfilePicture,0,0);
    });
}

function mouseReleased(){
    currentSize = 4;
}
function mousePressed(){
    fill(COLORS[int(frameCount/24)%COLORS.length]);
}

function keyPressed(){
    if((bLoadedPicture) && (key == 'P')){
        postCanvasToFB('');
    }
    if((bLoadedPicture) && (key == 'C')){
        image(mProfilePicture,0,0);
    }
    if((bLoadedPicture) && (key == 'F')){
        fImg = createImage(mProfilePicture.width, mProfilePicture.height);
        fImg.copy(mProfilePicture,
                  0,0, mProfilePicture.width,mProfilePicture.height,
                  0,0, mProfilePicture.width,mProfilePicture.height);

        fImg.filter("GRAY");
        fImg.filter("ERODE");
        fImg.filter("DILATE");

        image(fImg,0,0);
    }
}

function windowResized() {
    //resizeCanvas(max(500,windowWidth*0.66), windowHeight-32);
    if(bLoadedPicture){
        image(mProfilePicture,0,0);
    }
}
