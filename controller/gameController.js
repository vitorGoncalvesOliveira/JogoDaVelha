let uniqid = require('uniqid')
let games = require('../model/games')
let { translatePosition , thereIsWinner } = require('../util/util')

const gameController = {
    createNewGame: ()=> {
        let firstPlayer = Math.round( (Math.random() * 100) ) % 2 == 0 ? 'X' : 'O';
        
        let newGame = {
            id: uniqid(),
            firstPlayer: firstPlayer
        }
        
        games.push(newGame);
        return newGame;        
    },

    getGames: () =>{
        return games;
    },

    markMovement: ( gameId ,movement ) =>{

        let theGame = games.filter(element => element.id === gameId )        

        if(theGame.length > 0){
            if(movement.hasOwnProperty('winner') ){
                return theGame[0]
            }
            if(theGame[0].hasOwnProperty('nextPlayer')){

                if(movement.player === theGame[0]['nextPlayer'])
                    throw Error("Não é turno do jogador!")

                if( theGame[0]['board'][translatePosition(movement.position)] )
                    throw Error("Posiçãojá marcada!")

                theGame[0]['board'][translatePosition(movement.position)] =  movement.player;//theGame[0].nextPlayer;
                theGame[0]['nextPlayer'] = theGame[0]['nextPlayer'] == 'X' ? 'O' : 'X';
                theGame[0].jogada ++;

                theGame[0]['historic'].push({
                    player: theGame[0].nextPlayer,
                    position: { x: movement.position.x , y: movement.position.y },
                    jogada: theGame[0].jogada 
                })
                if( thereIsWinner( movement.player, theGame[0]['board'] ) )
                    theGame[0]['winner'] = movement.player;
                else if(theGame[0].jogada >= 9)
                    theGame[0]['winner'] = "Draw";

                return theGame[0]

            }else{
                
                if(movement.player != theGame[0].firstPlayer)
                    throw Error("Não é turno do jogador!")

                theGame[0]['nextPlayer'] = theGame[0].firstPlayer == 'X' ? 'X' : 'O';
                theGame[0]['jogada'] = 1
                theGame[0]['board'] = []    
                theGame[0]['historic'] = [];
                theGame[0]['historic'].push({
                    player: theGame[0].nextPlayer,
                    position: { x: movement.position.x , y: movement.position.y },
                    jogada: theGame[0].jogada
                })
                

                theGame[0]['board'][translatePosition(movement.position)] = movement.player;
                return theGame[0]

            }
        }else{
            throw Error("Partida não encontrada");
        }

    }
    
}

module.exports = gameController;