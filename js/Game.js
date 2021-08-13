class Game{

    constructor(){}

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",function(data){
            gameState=data.val();
        })
    }

    updateState(state){
        database.ref('/').update({
            gameState:state
        })
    }

   async start(){
        if(gameState === 0){

            player=new Player();
            var playerCountRef=await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount=playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }
    }
    play(){
        form.hide();
        textSize(30);
        text("Game Start",120,100);
        player.getPlayerInfo();

        if(allPlayers !== undefined){
            var display_position=130;
            textSize(15);
            //text(allPlayers,120,display_position);

            for(var plr in allPlayers){
                if(plr==="player"+player.index){
                    fill("red");
                }
                else{
                    fill("black");
                }
               
                text(allPlayers[plr].name+":"+allPlayers[plr].distance,120,display_position);
                display_position+=20;

               
               

            }


        }

        if(keyIsDown(UP_ARROW) && player.index!==null){
            player.distance+=50;
            player.update();
        }
    }
}