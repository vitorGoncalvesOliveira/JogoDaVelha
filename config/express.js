const app = require('express')();
const bodyParser = require('body-parser');
const compression = require('compression');

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }))

app.use((req, res, next) => {
    const origin = req.get('origin');
    if (origin)
        res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
    next();
});


module.exports = app;