const app = require('../config/express')
const gameController = require('../controller/gameController')
const { checkPosition } = require('../util/util')

app.get('/', (req , res) =>{

    res.status(200).json('BEM VINDO AO JOGO DA VELHA');
});

app.get('/game', (req , res) =>{

    res.status(200).json(gameController.getGames());
});

app.post('/game', (req, res) =>{    
    try{
        res.status(200).json(gameController.createNewGame());
    }catch(e){
        res.status(500).json({error: e.message})
    }
})

app.post('/game/:id/movement', (req, res) =>{

    try{
        checkPosition(req.body.position.x)
        checkPosition(req.body.position.y)

        let movement =  gameController.markMovement(req.params.id, req.body)

        if(movement.hasOwnProperty('winner')){
            if(movement.winner == "Draw"){
                movement = {
                    "status": "Partida finalizada",
                    "winner": "Draw"
                }
            }else{
                movement = {
                    "status": "Partida finalizada",
                    "winner": movement.winner
                }
            }
        }
            
        res.status(200).json(movement)
    }catch(e){
        res.status(500).json({msg:e.message})
    }

})