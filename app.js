const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Create connection to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'heymaxDB'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Routes frontend
app.get('/', (req, res) => {
  let sql = 'SELECT * FROM product';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.render('index', { products: result });
  });
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});