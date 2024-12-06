const express = require('express')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const session = require('express-session')
const sqlite3 = require('sqlite3').verbose()

const app = express();

//multipart/formdata
const multer = require('multer')
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { cb(null, '/reports')}, 
    filename: (req, file, cb) => { cb(null, file.originalname) } 
})
const upload = multer({ storage })

//queries

// ************id provided by session***************

//3. get progress and final report (student)
const sql3_progress = `SELECT name, filename, grade FROM student s JOIN progress_report p ON s.id = p.student_id WHERE s.id = ?`
const sql3_final = `SELECT name, filename, grade FROM student s JOIN final_report p ON s.id = p.student_id WHERE s.id = ?`

//4. upload progress file (student)
//(?, ?, NULL), ? --> name, filepath, grade, student_id
const sql4 = `INSERT INTO progress_report VALUES (?, ?, NULL) WHERE student_id = ?`

//5. upload final file (student)
//(?, ?, NULL), ? --> name, filepath, grade, student_id
const sql5 = `INSERT INTO progress_report VALUES (?, ?, NULL) WHERE student_id = ?`





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







