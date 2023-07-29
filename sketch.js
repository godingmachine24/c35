var ball,database,position;

function setup(){
  database=firebase.database()
  createCanvas(500,500)

  ball=createSprite(250,250,20,20)
  ball.shapeColor="blue"

  var ballposition=database.ref('ball/position')
  ballposition.on('value',readposition,showerror)
}

function draw(){
background("white")
if(keyDown(LEFT_ARROW)){
  writeposition(-1,0)
}
else if(keyDown(RIGHT_ARROW)){
  writeposition(1,0)
}
else if(keyDown(UP_ARROW)){
  writeposition(0,-1)
}
else if(keyDown(DOWN_ARROW)){
  writeposition(0,1)
}
drawSprites()
}

function writeposition(x,y){
  database.ref('ball/position').set({
    'x':position.x+x,
    'y':position.y+y,
  })
}

function readposition(data){
  position=data.val()
  ball.x=position.x
  ball.y=position.y
}

function showerror(){
  console.log("error in writing in database code")
}