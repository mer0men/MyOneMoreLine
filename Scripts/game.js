function Draw() {
    ctx.clearRect(0, 0, 512, 512);
    ctx.drawImage(Hero.Img, Hero.X - 31, Hero.Y - 31);
    for (let i = 0; i < 5; i++){
        ctx.beginPath();
        ctx.arc(BlockList[i].X ,BlockList[i].Y + TrackOffset,BlockList[i].Radius,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    if(IsMouseDown){
        ctx.beginPath();
        ctx.moveTo(Hero.X , Hero.Y );
        ctx.lineTo(BlockList[NearestBlock].X, BlockList[NearestBlock].Y + TrackOffset);
        ctx.stroke();
    }
}

function CheckBlocks() {
    for (let i = 0; i < 5; i++){
        if (BlockList[i].Y + TrackOffset > 530){
            BlockList[i] = new Block(getRandom(20 , 500), BlockList[HighBlock].Y - 150);
            HighBlock = i;
        }
    }
}

//TODO
//Incorrect finding of near point
function FindNearestBlock() {
    for (let i = 0; i < 5; i++){
        if (DistanceFromHeroToBlock(i) < DistanceFromHeroToBlock(NearestBlock) ||
            (BlockList[NearestBlock].Y + TrackOffset) > Hero.Y ){
            NearestBlock = i;
        }
    }
}

function DistanceFromHeroToBlock(num) {
    return(Math.sqrt(Math.pow((BlockList[num].X - (Hero.X )),2) +
        Math.pow(((BlockList[num].Y + TrackOffset) - (Hero.Y )),2)));
}

function MouseDown() {
    IsMouseDown = true;

    FindNearestBlock();
    Radius = Math.abs(Hero.X  - BlockList[NearestBlock].X);
}

function CheckNeedRotation() {
    if ((Math.abs(Hero.X  - BlockList[NearestBlock].X) >= (Math.abs(Hero.Y - (BlockList[NearestBlock].Y + TrackOffset))))){
        Hero.RoundMoving = true;
        Angle = FindAngle();
        if (Angle % 360 > 270){
        	Clockwise = true;
        } else {
        	Clockwise = false;
        }
    	LastOffset = TrackOffset;
    }
}

function FindAngle(){
 	if (BlockList[NearestBlock].X > Hero.X ){
 		return(90 - RadToDeg(Math.atan((Math.abs((Hero.Y ) - (BlockList[NearestBlock].Y + TrackOffset)))/(Math.abs(BlockList[NearestBlock].X - (Hero.X ))))))+ 180;
 	} else {
        return(90 - RadToDeg(Math.atan((Math.abs((Hero.Y ) - (BlockList[NearestBlock].Y + TrackOffset)))/(Math.abs(BlockList[NearestBlock].X - (Hero.X ))))))+ 270;
 	}
}

function MouseUp() {
    IsMouseDown = false;
    Hero.RoundMoving = false;
}

function RadToDeg(rad){
	return rad *180 / Math.PI;
}

function DegToRad(deg) {
    return deg * Math.PI / 180;
}

var GameTimer = setInterval( function () {

    if (IsMouseDown && !Hero.RoundMoving){
        CheckNeedRotation();
    }

    if(Hero.RoundMoving){
    	if(Clockwise){
        	Angle += GAMESPEED;
        } else {
        	Angle -= GAMESPEED;
        }
        //TODO
        //Incorrect TrackOffset && Hero.X
        TrackOffset = LastOffset + (Radius * Math.sin(DegToRad(Angle))) + (BlockList[NearestBlock].Y + LastOffset);
        Hero.X = BlockList[NearestBlock].X  +  (Radius * Math.cos(DegToRad(Angle)));
    } else {

        //TODO
        //Fix endless TrackOffset
        TrackOffset += GAMESPEED;
        Hero.X += GAMESPEED * Math.cos(Angle * Math.PI / 180);
    }

    CheckBlocks();
    Draw();
}, 1000 / 120 );

