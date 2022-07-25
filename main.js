let ball_x, ball_y, ball_dia,dx,dy;
let rec_x, rec_y, rec_w, rec_h, rec_dx;
const bh=20,bw=90;
let score=0;
let life=4;
let t=0, s=1, time=0;
function setup() {
  createCanvas(400, 400);
  ball_x=width/2;
  ball_y=height/2;
  dx=1;
  dy=2;
  ball_dia=30;
  rec_w = 70;
  rec_h = 20;
  rec_x = width/2 - (rec_w/2);
  rec_y = height-rec_h;
  rec_dx=3;
  bricks = [];
  for(let i=0; i<4 ; i++){
    bricks.push([])
    for(let j=0; j<4 ; j++){
      bricks[i].push({
        width : 90,
        hight : 20,
        x : i* 95+10,
        y : j* 25 +40,
        status : "show"
      })
    }
  }
}
function draw(){
  background("black");
  circle(ball_x,ball_y, ball_dia);
  ball_x+=dx;
  ball_y+=dy;
  if(ball_x>=(width-ball_dia/2)){
    dx=-(dx);
  } 
  if(ball_y>=(height-ball_dia/2)){
    life-=1;
    dy=-(dy);
  } 
  if(ball_x<=(ball_dia/2)){
    dx=-(dx);
  } 
  if(ball_y<=(ball_dia/2)){
    dy=-(dy);
  }
  rect(rec_x, rec_y, rec_w, rec_h);
  fill("green")
  textSize(10);
  text("Score: "+score+" Life: "+life,20,20)
  fill('white')
  if(score==5&&s==1) {dx=2*dx; s--;}
  for(let i = 0; i<4 ; i++){
    for(let j=0; j<4 ; j++){
      if(bricks[i][j].status=="show"&&life>0){
        rect(bricks[i][j].x, bricks[i][j].y, bricks[i][j].width, bricks[i][j].hight)
      }
    }
  }
  if(rec_x>=0){
    if(keyIsDown(LEFT_ARROW)){
      rec_x-=rec_dx;
    }
  }
  if(rec_x<=width-rec_w){
      if(keyIsDown(RIGHT_ARROW)){
      rec_x+=rec_dx;
    }
  }
  
  function isCollide(ballx,bally,d,rx,ry,w,h,status){
    let c1=rx-(d/2);
    let c2=rx+w+(d/2);
    let c3=ry-(d/2);
    let c4=ry+h+(d/2)
    if((ballx<=c2&&ballx>=c1)&&(bally<=c4&&bally>=c3)&&status=="show") {
        return true;
    }
    return false;
  }
  if(isCollide(ball_x,ball_y,ball_dia,rec_x,rec_y,rec_w,rec_h,"show")){
    if(!isCollide(ball_x-dx,ball_y,ball_dia,rec_x,rec_y,rec_w,rec_h,"show")){
        dx=-dx;
    }else if(!isCollide(ball_x,ball_y-dy,ball_dia,rec_y,rec_w,rec_h,"show")){
        if(keyIsDown(LEFT_ARROW)){
            dx=dx-1;
          }
          if(keyIsDown(RIGHT_ARROW)){
            dx=dx+1;
          }
        dy=-dy;
    }
    else {
        dx=-dx;
        dy=-dy;
    }
  }
  
  for(let i=3; i>=0; i-- ){
    for(let j=3; j>=0; j--){
      let x=bricks[i][j].x;
      let y=bricks[i][j].y;
      if(isCollide(ball_x,ball_y,ball_dia,x,y,bw,bh,bricks[i][j].status)){
        if(!isCollide(ball_x-dx,ball_y,ball_dia,x,y,bw,bh,bricks[i][j].status)){
            dx=-dx;
        }else if(!isCollide(ball_x,ball_y-dy,ball_dia,x,y,bw,bh,bricks[i][j].status)){
            dy=-dy;
        }
        else {
            dx=-dx;
            dy=-dy;
        }
        bricks[i][j].status="hide";
        score+=1;
      }
    }
  }
  let func=(x)=>{
    return Math.round((((x-8)*(x-8)*(x-8)*(x-8))/10000)-8)
  }
  time++;
   
  if(life<=0){
    //t++;
    ball_y+=dy;
    dx=0;
    dy=0;
    rec_dx=0;
    if(score<=16){
      fill('yellow');
      textSize(25);
      textAlign(CENTER);
      text(" GAME LOST  Score : "+score,width/2,height/2);
      textAlign(LEFT);
      textSize(10)
    }
    else if(score>16&&score<=32){
      fill('green');
    textSize(25);
    textAlign(CENTER);
    text("Nice try\n your Score is "+score,width/2,height/2);
    textAlign(LEFT);
    textSize(10)
    }else{
      fill('orange');
    textSize(25);
    textAlign(CENTER);
    text("well done\n your Score is "+score,width/2,height/2);
    textAlign(LEFT);
    textSize(10)
    }
    for(let i = 0; i<4 ; i++){
    for(let j=0; j<4 ; j++){
      if(bricks[i][j].status=="show"){
        yb=bricks[i][j].y+func(t)
        rect(bricks[i][j].x,yb, bricks[i][j].width, bricks[i][j].hight);
      }
    }
  }
  }
    //Game own
     if(Math.round(time/60)==180&&life!=0){
       --time;
      ball_y+=dy;
      dx=0;
      dy=0;
      rec_dx=0;
      fill('yellow');
      textSize(16);
      textAlign(CENTER);
      text("Time Out \n your Score is "+score,width/2,height/2);
      textAlign(LEFT);
      textSize(10)
     }
  if(score%16==0&&isCollide(ball_x,ball_y,ball_dia,rec_x,rec_y,rec_w,rec_h,"show")){
    for(let i = 0; i<4 ; i++){
    for(let j=0; j<4 ; j++){
      bricks[i][j].status="show"
    }
  }
  }
}
