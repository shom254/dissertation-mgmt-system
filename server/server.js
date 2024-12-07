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

/*
//cors (just in case/for development stage)
app.use(cors( {
    origin: 'http:localhost:5173',
    credentials: true,
}))
*/

//session management (cookies)
app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: false,
        maxAge: 60000 * 10,
    }
}))

// serve
//app.use(history({ index : '/index.html' }))
//app.use(express.static(__dirname + "/dist"))


// listen
const PORT = 8080;
app.listen(PORT, 'localhost', () => {
    console.log(`DMS Server started at PORT ${PORT}`)
})

// database
const source = "reports.db"

//e.g .console.log(GET - /api/users/)
const logger = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`)
    next();
};
app.use(logger);


//queries


// ************id provided by session***************

//1. login (user)
const sql1 = `SELECT * FROM user WHERE password = ?`

//2. login (admin)
//none. hardcoded.

//3. get progress and final report (student)
const sql3_progress = `SELECT name, filename, grade FROM student s JOIN progress_report p ON s.id = p.student_id WHERE s.id = ?`
const sql3_final = `SELECT name, filename, grade FROM student s JOIN final_report p ON s.id = p.student_id WHERE s.id = ?`

//4. upload progress file (student)
//(?, ?, NULL) --> name, filepath, grade,
const sql4 = `INSERT INTO progress_report VALUES (?, ?, NULL) WHERE student_id = ?`

//5. upload final file (student)
//(?, ?, NULL) --> name, filepath, grade,
const sql5 = `INSERT INTO final_report VALUES (?, ?, NULL) WHERE student_id = ?`

//6. See Assigned Students (Teacher)
const sql6 = `SELECT s.id, s.first_name, s.last_name, pr.grade AS grade1, fr.grade AS grade2 FROM student s JOIN progress_record pr ON s.id = pr.student_id JOIN final_record fr ON s.id = fr.student_id`

//7. Grade Progress Report (Teacher)
const sql7 = `UPDATE progress_report SET grade = ? WHERE student_id = ?`
//student_id = (SELECT id FROM student WHERE first_name = ? AND last_name = ?)

//8. Grade Final Report (Teacher)
const sql8 = `UPDATE final_report SET grade = ? WHERE student_id = ?`

//9. See All Students (admin)
const sql9 = `SELECT s.first_name, s.last_name, pr.grade AS grade1, fr.grade AS grade2, s.assigned_teacher FROM student s JOIN progress_record pr ON s.id = pr.student_id JOIN final_record fr ON s.id = fr.student_id`

//10. Add A Student (Admin)
const sql10_user = `INSERT INTO user (password, role) VALUES (?, 'student')`
const sql10_CTE = `SELECT id FROM student WHERE password = ?`
const sql10_student = `INSERT INTO student (id, first_name, last_name, assigned_teacher) VALUES (?, ?, ?)`

//11. Assign a Teacher to Existing Student (Admin)
//special case because my logic is bad
const sql11 = `UPDATE student SET assigned_teacher = (SELECT id FROM teacher WHERE (first_name || ' ' || last_name = ?))`

// api endpoints

//1. user login
app.post('/api/users', express.json(), (req, res) => {
    let db = new sqlite3.Database(source)
    try {
        const { password } = req.body
        db.serialize(() => {
            db.get(sql1, [password], (err, row) => 
            {
                if (err) {
                    console.log(err)
                    res.status(500).send({ error: "Sorry, please try again later"})
                    return
                }
                if (row) {
                    console.log(row)
                    req.session.user = row
                    //user: { id: 5, password: 'u555555', role: 'student' }
                    res.status(201).json(row)
                    return
                }
                res.status(401).send({ "error" : "Incorrect Password"})
            })
        })
        db.close()
    } catch (error) {
        console.log(error)
        res.status(400).json({ "error": "Missing credentials" })
    }
})

//2. login (admin)
app.post('/api/')
