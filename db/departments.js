const client = require('./client.js');

const createDepartment = async (departmentName) => {
  console.log(`Create Department Function`);

  try{
    
    const {rows} = await client.query(`
      INSERT INTO departments (name)
      VALUES ($1)
      RETURNING *;
      `,[departmentName]);

      return rows[0];

  } catch(err) {
    console.log(err);
  }

}

module.exports = {
  createDepartment
};