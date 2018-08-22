class Player {
    constructor(){
        this.X = 200;
        this.Y = 200;
        this.RoundMoving = false;
        //this.Head = STYLE_ID[Style];
        this.Img = HeroImg;
    }
}

class Block {
    constructor(x, y){
        this.X = x;
        this.Y = y;
        this.Radius = getRandom(3, 10);
    }
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}


var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");



var TrackOffset = 0;
var LastOffset = 0;
var Radius = 0;
var Angle = 90;
var HeroImg = new Image();
HeroImg.src = "Assets/Hero.png"

var Hero = new Player();
var BlockList = new Array(5);
let y = -150;
    for (let i = 0; i < 5; i++){
        BlockList[i] = new Block( getRandom(20, 512), y);
        y -= 150;
    }
var HighBlock = 4;
var NearestBlock = 0;


IsMouseDown = false;
Clockwise = false;

//______________________________________Consts__________________________________________

GAMESPEED = 1;