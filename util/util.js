function checkPosition( value ){
    if(value < 0 || value >  2)
        throw Error("Posição invalida")
} 
function translatePosition(position){
    
    if(position.x == 0 && position.y == 0)
        return 0;
    else if(position.x == 1 && position.y == 0)
        return 1;
    else if(position.x == 2 && position.y == 0)
        return 2;
    else if(position.x == 0 && position.y == 1)
        return 3;
    else if(position.x == 1 && position.y == 1)
        return 4;
    else if(position.x == 2 && position.y == 1)
        return 5;
    else if(position.x == 0 && position.y == 2)
        return 6;
    else if(position.x == 1 && position.y == 2)
        return 7;
    else if(position.x == 2 && position.y == 2)
        return 8;
}

function thereIsWinner(player, board){
    if( player == board[0] && player == board[3] && player == board[6]  || 
        player == board[1] && player == board[4] && player == board[7]  ||
        player == board[2] && player == board[5] && player == board[8]  ||
        player == board[0] && player == board[1] && player == board[2]  ||
        player == board[3] && player == board[4] && player == board[5]  ||
        player == board[6] && player == board[7] && player == board[8]  ||
        player == board[0] && player == board[4] && player == board[8]  ||
        player == board[6] && player == board[4] && player == board[2] )
        return true;
    
    return false;
}

module.exports = {
    checkPosition: checkPosition,
    translatePosition:translatePosition,
    thereIsWinner:thereIsWinner
}