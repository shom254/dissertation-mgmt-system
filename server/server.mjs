import express from "express";
import cors from 'cors';

const app = express();

//cors (just in case/for development stage)
const cors = cors();
app.use(cors)

//e.g .console.log(GET - /api/users/)
const logger = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`)
    next();
};
app.use(logger);

// api endpoints


// serve here

// listen
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`DMS Server started at PORT ${PORT}`)
})

