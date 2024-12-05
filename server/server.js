const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors")
const session = require("express-session")

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:4173'], // Allow requests from any origin
    credentials: true // Do not allow credentials
}));

// Hardcoded user credentials
const USER = {
    email: 'slrlab.dev@gmail.com',
    password: '123456',
    name: 'Shom'
};

app.use(session({
    secret: 'your-secret-key',
    name: 'my-session-id',
    resave: false,
    saveUninitialized: true, // Don't create session until something is stored
    cookie: {
        domain: ".app.localhost",
        httpOnly: false, // Prevent client-side access to the cookie
        //secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
        maxAge: 30 * 60 * 1000 // 30 minutes
    }
}));

app.get('/', (req,res) => { res.send('Hello World') })

app.post('/login', express.json(), (req, res) => {
    const { email, password } = req.body;

    // Check credentials
    if (email === USER.email && password === USER.password) {
        // Create a session
        req.session.userId = uuidv4(); // Assign a unique session ID
        // Send response with user object
        return res.status(200).json({ name: USER.name, sessionId: req.session.userId });
    } else {
        // Invalid credentials
        return res.status(403).send('Forbidden: Invalid email or password.');
    }
});

// Logout endpoint
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Logout failed.');
        }
        res.clearCookie('my-session-id'); // Clear the session cookie
        res.status(200).send('Logged out successfully.');
    });
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

/* https://www.npmjs.com/package/cors#simple-usage-enable-all-cors-requests */

/*
const connection mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: '?',
  database: '?'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()
*/