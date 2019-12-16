const app = require('./config/express');

//Routes
require('./routes/game')


//Server
app.listen(3000, function(){
    console.log("Server running in port 3000.")
})