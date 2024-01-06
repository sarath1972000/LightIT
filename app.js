var windowsWidth = window.innerWidth;
var windowsHeight = window.innerHeight;
var player ;
var enemy = [] ; 
var playerColor = ["grey" , "purple" , "blue","green","yellow","orange"];
var coinsCollection =[];
var coinsCollected =0;
var lives = 10 ; 

function start(){
    gameArea.startGame();
    player = new component(50 ,50 ,"blue",30,20);
    playerSurrond = new component(100 ,100 , "white",30,20);
    for(let i= 0 ; i<windowsWidth;i++){
        var x = Math.floor(Math.random()*1000)+1;
        var y = Math.floor(Math.random()*1000)+1;
        coinsCollection.push(new coinsComponent(x,y,5,0,2*Math.PI));
    }
    for(let k = 0 ; k<10 ;k++){
        var x = Math.floor(Math.random()*windowsWidth)+1;
        var y = Math.floor(Math.random()*windowsHeight)+1;
        enemy.push(new component(40,40,"black",x,y));
    }

}


function coinsComponent(x ,y,radius,startAngle,endAngle){
    this.x = x;
    this.y = y;
    this.radius = radius ;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.ctx = gameArea.context;
    this.createCoin = function(){
        // this.x = Math.floor(Math.random()*1000)+1;
        // this.y = Math.floor(Math.random()*1000)+1;
        ///this.ctx.globalCompositeOperation='destination-over';
        this.ctx.beginPath();
        
        this.ctx.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle);
        this.ctx.fillStyle = "black";
        this.ctx.stroke();
        this.ctx.fill();
    }
}


function component(width , height , color ,x,y){
    this.width =width;
    this.height =height;
    this.color= color;
    this.x=x;
    this.y=y;
    this.ctx = gameArea.context;
    this.update = function(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x , this.y , this.width,this.height);
    
    },
    this.PlayerSurrondUpdate = function(playerSide){
        // this.ctx.fill();
        if(playerSide === "right"){
            this.ctx.beginPath();
            this.ctx.moveTo(player.x+player.width+5 , player.y+5);
            this.ctx.lineTo(player.x+player.width+200 , player.y-100);
            this.ctx.lineTo(player.x+player.width+200 , player.y+player.height+100);
            this.ctx.lineTo(player.x+player.width+5 , player.y+player.height+5);
            this.ctx.closePath();
            this.ctx.fillStyle ="rgb(238, 245, 255)";
            this.ctx.stroke();
            this.ctx.fill();
            
        }
        else if(playerSide === "left"){
            this.ctx.beginPath();
            this.ctx.moveTo(player.x-1 , player.y-1);
            this.ctx.lineTo(player.x-200 , player.y-100);
            this.ctx.lineTo(player.x-200 , player.y+player.height+100);
            this.ctx.lineTo(player.x+1 , player.y+player.height-1);
            this.ctx.closePath();
            this.ctx.fillStyle ="#EEF5FF";
            this.ctx.stroke();
            this.ctx.fill();
        }
        else if(playerSide === "top"){
            this.ctx.beginPath();
            this.ctx.moveTo(player.x , player.y);
            this.ctx.lineTo(player.x-100, player.y-200);
            this.ctx.lineTo(100+player.x+player.width , player.y-200);
            this.ctx.lineTo(player.x+player.width , player.y);
            this.ctx.closePath();
            this.ctx.fillStyle ="#EEF5FF";
            this.ctx.stroke();
            this.ctx.fill();
        }
        else{
            this.ctx.beginPath();
            this.ctx.moveTo(player.x , player.y+player.height);
            this.ctx.lineTo(player.x-100, player.y+200);
            this.ctx.lineTo(100+player.x+player.width , player.y+200);
            this.ctx.lineTo(player.x+player.width , player.y+player.height);
            this.ctx.closePath();
            this.ctx.fillStyle ="#EEF5FF";
            this.ctx.stroke();
            this.ctx.fill();
            
        }
    }

}


var gameArea = {
    canvas : document.createElement("canvas"),
    startGame : function(){
        this.canvas.width = windowsWidth;
        this.canvas.height = windowsHeight;
        document.querySelector("body").insertBefore(this.canvas , document.body.childNodes[0]);
        this.context = this.canvas.getContext("2d");
        this.gameAreaInterval = window.setInterval(updateGameArea , 20);
        this.playerColorInterval = window.setInterval(updateplayercolor,1000);
        this.enemyMovement = window.setInterval(updateEnemyPosition,1000);
        window.addEventListener("keydown" , function(e){
            
            gameArea.playerKey = e.key;
            gameArea.mouseAction = true;
            
        })
        window.addEventListener("keyup" , function(e){
            gameArea.playerKey = false;
            gameArea.mouseAction = false ;
        })
    },
    enemyCollide : function(){        
            clearInterval(this.gameAreaInterval);
            clearInterval(this.playerColorInterval);
            clearInterval(this.enemyMovement);
            this.clear();
            document.querySelector(".coins").innerHTML ="Total coins collected "+coinsCollected;
            document.querySelector(".restart").innerHTML ="Refresh page to start the game";
    },
    
    clear : function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
}

function updateEnemyPosition(){
    for(let i=0 ;i<enemy.length;i++){
        if(enemy[i].x < windowsWidth/2 ){
            enemy[i].x+=10;
        }
        else{
            enemy[i].x =Math.floor(Math.random()*windowsWidth);
        }
    }
}

function timeout(){
    if(lives <=0) {
        player.color = "black";
        gameArea.enemyCollide();
    }
    else{
        for(let i =0;i<enemy.length;i++){
            if(enemy[i].x >=player.x && enemy[i].y>= player.y){
                if(enemy[i].x <=player.x+player.width && enemy[i].y <=player.y){
                    lives-=1;
                    document.querySelector("h2").innerHTML = "lives : "+lives;
                    player.color = "red";
                }
            }
            if(enemy[i].x >=player.x && enemy[i].y>= player.y+player.height){
                if(enemy[i].x <=player.x+player.width && enemy[i].y <=player.y+player.height){
                    lives-=1;
                    document.querySelector("h2").innerHTML = "lives : "+lives;
                    player.color = "red";
                }
            }
            if(enemy[i].x >=player.x && enemy[i].y>= player.y){
                if(enemy[i].x <=player.x && enemy[i].y <=player.y+player.height){
                    lives-=1;
                    document.querySelector("h2").innerHTML = "lives : "+lives;
                    player.color = "red";
                }
            }
            if(enemy[i].x >=player.x+player.width && enemy[i].y>= player.y){
                if(enemy[i].x <=player.x+player.width && enemy[i].y <=player.y+player.height){
                    lives-=1;
                    document.querySelector("h2").innerHTML = "lives : "+lives;
                    player.color = "red";
                }
            }

        }
    }
}


function updateGameArea(){
    gameArea.clear();
   
    if(gameArea.playerKey === "ArrowRight" && gameArea.playerKey){
        player.x+=1;
        if(gameArea.mouseAction){
            playerSurrond.PlayerSurrondUpdate("right");
        }
    }
    else if(gameArea.playerKey === "ArrowLeft" && gameArea.playerKey){
        player.x-=1;
        if(gameArea.mouseAction){
            playerSurrond.PlayerSurrondUpdate("left");
        }
    }
    if(gameArea.playerKey === "ArrowDown" && gameArea.playerKey){
        player.y+=1;
        if(gameArea.mouseAction){
            playerSurrond.PlayerSurrondUpdate("down");
        }
    }
    if(gameArea.playerKey === "ArrowUp" && gameArea.playerKey){
        player.y-=1;
        if(gameArea.mouseAction){
            playerSurrond.PlayerSurrondUpdate("top");
        }
    }
    player.update();
    for(let k=0;k<enemy.length;k++){
        enemy[k].update();
    }
    
    for(let i=0;i<coinsCollection.length;i++){
        coinsCollection[i].createCoin();
    }
    timeout();
    coinsCollide();
    
   
  
}
function updateplayercolor(){
    updateColor();
}
function updateColor() {
    var pickColor =playerColor[Math.floor((Math.random()*playerColor.length))];
    // this.ctx.fillStyle = pickColor;
    player.color=pickColor;
}
function coinsCollide(){
    // console.log(player.x ,player.y);
    // // console.log(player.x+player.width , player.y);
    // console.log(player.x , player.y+player.height);
    // console.log(player.x+player.width,player.y+player.height)
    // var x = player.x+player.height ; 
    for(let i =0;i<coinsCollection.length;i++){
        if(coinsCollection[i].x >=player.x && coinsCollection[i].y>= player.y){
            if(coinsCollection[i].x <=player.x+player.width && coinsCollection[i].y <=player.y){
                var index = coinsCollection.indexOf(coinsCollection[i]);
                coinsCollection.splice(index,1);
                coinsCollected+=1
                document.querySelector("h1").innerHTML = "Coins Collected :"+coinsCollected;

            }
        }
        if(coinsCollection[i].x >=player.x && coinsCollection[i].y>= player.y+player.height){
            if(coinsCollection[i].x <=player.x+player.width && coinsCollection[i].y <=player.y+player.height){
                var index = coinsCollection.indexOf(coinsCollection[i]);
                coinsCollection.splice(index,1);
                coinsCollected+=1
                document.querySelector("h1").innerHTML = "Coins Collected :"+coinsCollected;
            }
        }
        if(coinsCollection[i].x >=player.x && coinsCollection[i].y>= player.y){
            if(coinsCollection[i].x <=player.x && coinsCollection[i].y <=player.y+player.height){
                var index = coinsCollection.indexOf(coinsCollection[i]);
                coinsCollection.splice(index,1);
                coinsCollected+=1
                document.querySelector("h1").innerHTML = "Coins Collected :"+coinsCollected;
            }
        }
        if(coinsCollection[i].x >=player.x+player.width && coinsCollection[i].y>= player.y){
            if(coinsCollection[i].x <=player.x+player.width && coinsCollection[i].y <=player.y+player.height){
                var index = coinsCollection.indexOf(coinsCollection[i]);
                coinsCollection.splice(index,1);
                coinsCollected+=1
                document.querySelector("h1").innerHTML = "Coins Collected :"+coinsCollected;
            }
        }
        coinsCollection[i].createCoin();

    }   

}


start();