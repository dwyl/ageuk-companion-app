const mysql = require('mysql');
const env = require('env2')('config.env');

const connection = mysql.createConnection({
  host: 'localhost', // add in host for when deployed
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_SECRET,
  database: 'companionapp'
});

connection.connect((err) => {
  if (err) {
    console.log('Failed to connect to database', err);
  } else {
    console.log('Database connected');
  }
});

// test set up for adding to db
connection.query('INSERT INTO test VALUES ("Katherine", "26");', (err, rows) => {
  if (err) throw err;
  console.log('Data received from Db:\n');
  console.log(rows);
  connection.end();
});
