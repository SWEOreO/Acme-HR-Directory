const {createEmployee} = require(`./db/employees`);
const client = require('./db/client.js');
client.connect();

const express = require('express');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log('WELCOME TO MY SERVER');
  next();
});

app.get('/api/employees', (req, res) => {
  res.send('HELLO EMPLOYEE');
});

app.get('/api/departments', (req, res) => {
  res.send('DEPARTMENT LIST')
});

app.post('/api/v1/employee', async(req, res, next) => {
  const { name } = req.body;

  try {
    const newEmployee = await createEmployee(name, null)
    res.send(newEmployee);
  } catch(err) {
    console.log(err);
    next('ERROR CREATING EMPLOYEE');
  }
});

// delete existing employee if certain employee exists
app.delete('/api/employees/:id', async(req, res, next) => {
  try {
    // identify the calling id is employee id ??
    // const employeeId = parseInt(req.params.id);
    const {id} = req.params;
    // check if the id is existing in database
    // if yes, delete the employee info
    const deletedEmployee = await client.query(`
      DELETE FROM employees
      WHERE id = $1
      `,[id]);
      console.log(deletedEmployee);
      res.status(204).send(`USER DELETED`);

  } catch (err) {
    console.log(err);
  }

});

// update existing employee's info if certain employee exists
app.put('/api/employees/:id', async(req,res,next) => {
  try {
    // identify the calling id is employee id 
    // const employeeId = parseInt(req.params.id);
    const {id} = req.params;
    //
    const {name} = req.body;
    const newEmployee = await client.query(`
      UPDATE employees
      SET name = $1
      WHERE id = $2 
      `,[name,id]);
    console.log(newEmployee);
    res.status(201).send(`USER UPDATED`); // more for browser


  } catch(err) {
    console.log(err);
  }

});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(404).send(err);
});

app.listen(3000, () => {
  console.log(`Listening on POST 3000`)
});