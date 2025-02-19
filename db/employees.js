const client = require('./client.js');

const createEmployee = async(employeeName, departmentId) => {
  try{
    const{rows} = await client.query(`
      INSERT INTO employees (name, department_id)
      VALUES ($1, $2)
      RETURNING *;
    `,[employeeName,departmentId]);

    const employee = rows[0];
    return employee;

  } catch(err) {
    console.log(err)
  }
}

module.exports = {createEmployee};