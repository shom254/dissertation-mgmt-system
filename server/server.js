const express = require('express')
const cors = require('cors')
const history = require('connect-history-api-fallback')
import session from 'express-session'

const app = express();


//cors (just in case/for development stage)
const crossorigin = cors();
app.use(crossorigin)

//session management (cookies)
app.use(session({
    secret: 'secret'
    
}))

// serve
//app.use(history({ index : '/index.html' }))
//app.use(express.static(__dirname + "/dist"))

// listen
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`DMS Server started at PORT ${PORT}`)
})

//e.g .console.log(GET - /api/users/)
const logger = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`)
    next();
};
app.use(logger);


// api endpoints
app.get('/api', (req, res) => { res.send('HEI')})




