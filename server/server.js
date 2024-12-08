const express = require('express')
//const cors = require('cors')
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
const sql1_id = `SELECT id, role FROM user WHERE password = ?`
const sql1_student = `SELECT first_name, last_name FROM student where id = ?`
const sql1_teacher = `SELECT first_name, last_name FROM teacher where id = ?`

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
        let user = {
            id: null,
            role: null,
            first_name: null,
            last_name: null
        }
        const { password } = req.body
        db.serialize(() => {
            db.get(sql1_id, password, (err, row) => {
                if (err) {
                    console.error(err)
                    res.status(500).send({ error: "Sorry, please try again later"})
                    return
                }
                if (row) {
                    //user: { id: 5, role: 'student' }
                    Object.assign(user, row)
                    db.serialize(() => {
                        if (user.role === 'student') {
                            db.get(sql1_student, user.id, (err,row) => {
                                if (err) {
                                    console.error(err)
                                    res.status(500).send({ error: "Sorry, please try again later"})
                                }
                                if (row) {
                                    Object.assign(user, row)
                                    req.session.user = user
                                    console.log(user)
                                    res.status(201).json(user)
                                }
                            })
                        }
                        else if (user.role === 'teacher') {
                            db.get(sql1_teacher, user.id, (err,row) => {
                                if (err) {
                                    console.error(err)
                                    res.status(500).send({ error: "Sorry, please try again later"})
                                }
                                if (row) {
                                    Object.assign(user, row)
                                    req.session.user = user
                                    res.status(201).json(user)
                                }
                            })
                        }
                    })
                }
                else {
                    res.status(401).json({"error": "Wrong password"})
                }
            })
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ "error": "Invalid credentials" })
    }
})


// app.post('/api/users', express.json(), (req, res) => {
//     let db = new sqlite3.Database(source)
//     try {
//         const { password } = req.body
//         db.serialize(() => {
//             db.get(sql1, password, (err, row) => 
//             {
//                 if (err) {
//                     console.error(err)
//                     res.status(500).send({ error: "Sorry, please try again later"})
//                     return
//                 }
//                 if (row) {
//                     console.log(row)
//                     req.session.user = row
//                     //user: { id: 5, password: 'u555555', role: 'student' }
//                     res.status(201).json(row)
//                     return
//                 }
//                 res.status(401).send({ "error" : "Incorrect Password"})
//             })
//         })
//         db.close()
//     } catch (error) {
//         console.error(error)
//         res.status(400).json({ "error": "Invalid credentials" })
//     }
// })


app.delete('/api/users', (req, res) => {
    const user = req.session.user
    req.session.destroy((err) => {
        if (err) {
            console.error(error)
            res.status(401).send({"error": "Session expired"})
        }
        else {
            console.log('DELETING USER: ' + JSON.stringify(user))
            res.status(204).send() // no body
        }
        //redirect to home page (client side)
    })  
})

//2. admin login

app.post('/api/admin', express.json(), (req, res) => {
    try {
        const { password } = req.body
        if (password === 'admin') {
            const user = { role: "admin" }
            req.session.user = user
            res.status(201).send(user)
        }
        else {
            res.status(401).send({ "error" : "Incorrect Password"})
        }
    }
    catch (error) {
        console.error(error)
        res.status(400).json({ "error": "Invalid credentials" })
    }
})

app.delete('/api/admin', (req, res) => {
    let admin = req.session.user
    req.session.destroy((err) => {
        if (err) {
            console.error(error)
            res.status(401).send({"error": "Session expired"})
        }
        else {
            console.log('DELETING ADMIN ' + JSON.stringify(admin))
            res.status(204).send() // no body
        }
        //redirect to home page (client side)
    })
})

//3. get progress and final report (student | teacher)
app.get('/api/reports', (req, res) => {
    let db = new sqlite3.Database(source)
    
    const execute = function (id) { 
        let report = {
            progress: {
                name: null,
                filename: null, 
                grade: null
            },
            final: {
                name: null,
                filename: null, 
                grade: null
            }
        }
        db.serialize(() => {
            db.get(sql3_progress, [id], (err,row) => {
                if (err) { 
                    console.error(err)
                    res.status(500).send({ error: "Sorry, please try again later"})
                    return
                }
                if (row) {
                    console.log(row)
                    report.progress = { ...row }
                }
            }).get(sql3_final, [id], (err, row) => {
                if (err) { 
                    console.error(err)
                    res.status(500).send({ error: "Sorry, please try again later"})
                    return
                }
                if (row) {
                    console.log(row)
                    report.final = { ...row }
                }
                console.log(report)
                res.status(200).json(report)
            })
        })
    }

    try {
        if (req.session.user.role === 'student') {
            //get id from session
            const { id } = req.session.user
            execute(id)
        }
        else {
            //get id from body
            const { id } = req.body
            execute(id)
        }
        db.close()
    }
    catch (error) {
        console.error(error)
        res.status(400).json({ "error": "Invalid request" })
    }
})


// serve
app.use(history({ index : 'index.html' }))
app.use(express.static(__dirname + "/dist"))


// listen
const PORT = 8080;
app.listen(PORT, 'localhost', () => {
    console.log(`DMS Server started at PORT ${PORT}`)
})
