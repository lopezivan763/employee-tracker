const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: 'employees_db'
    },
    console.log(`Connected to the movies_db database.`)
  );


  app.get('/api/employee', (req, res) => {
    db.query('SELECT * FROM employee', function(err, results){
        console.log(results);
        res.json(results);
    })
  });

  app.get('/api/department', (req, res) => {
    db.query('SELECT * FROM department', function(err, results){
        console.log(results);
        res.json(results);
    })
  });

  app.get('/api/role', (req, res) => {
    db.query('SELECT * FROM role', function(err, results){
        console.log(results);
        res.json(results);
    })
  });

  // add a department 
  app.post('/api/add-department', (req, res) => {
    const departmentName = req.body.department_name; // Assuming the department_name is provided in the request body
    db.query('INSERT INTO department (department_name) VALUES (?);', [departmentName], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error adding department' });
        } else {
            console.log(results);
            res.json(results);
        }
    });
});


//   app.put('/api/review/:id', (req, res) => {
//     db.query(`UPDATE reviews SET review = ? WHERE id = ?`, [ req.body.review, req.params.id], function (err, results) {
//         err ? console.log(err) : console.table(results);
//         res.json(results)
//     })
// }); 
  
app.delete('/api/del-department/:id', (req, res) => {
  const departmentId = req.params.id; // Assuming the department id is sent as a request parameter
  db.query('DELETE FROM department WHERE id = ?;', [departmentId], (err, result) => {
      if (err) {
          res.status(500).json({ error: 'Error deleting department' });
      } else {
          res.status(200).json(`Deleted department with id: ${departmentId}`);
      }
  });
});

  

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });