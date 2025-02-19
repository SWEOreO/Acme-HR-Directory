const client = require('./client.js');
const {createDepartment} = require('./departments.js');
const {createEmployee} = require('./employees.js')


const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS employees;
      DROP TABLE IF EXISTS departments;
    `)
  } catch(err) {
    console.log(err)
  }
}


const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE departments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) UNIQUE NOT NULL
      );

      CREATE TABLE employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        department_id INTEGER REFERENCES departments(id)
      );
      `);

  } 
  catch(err) {
    console.log(err);
  }
}

const syncSeed = async() => {
  try{
    await client.connect();
    console.log(`CONNECTED TO THE DB`);

    console.log(`DROPPING TABLES`)
    await dropTables();
    console.log('TABLES DROPPED');

    console.log('CREATING TABLES');
    await createTables();
    console.log('TABLES CREATED');

    console.log('CREATING DEPARTMENTS');
     const hrDepartment = await createDepartment('HR Department');
    //  console.log(hrDepartment);
     const marketingDepartment = await createDepartment('Marketing Department');
     const techDepartment = await createDepartment(`Tech Department`);
     const financeDepartment = await createDepartment(`Finance Department`);
     const lawDepartment = await createDepartment(`Law Department`);
    console.log('DEPARTMENTS CREATED');

    console.log('CREATING EMPLOYEES');
    await createEmployee('Alice', hrDepartment.id);
    await createEmployee('Bella', marketingDepartment.id);
    await createEmployee('Cony', marketingDepartment.id);
    await createEmployee('Denis', techDepartment.id);
    await createEmployee('Mike', techDepartment.id);
    await createEmployee('Emma', financeDepartment.id);
    await createEmployee('Fred', lawDepartment.id);
    await createEmployee('Jones', financeDepartment.id);
    await createEmployee('Henry', null);
    await createEmployee('Gray', null);
    console.log('EMPLOYEES CREATED');

  } catch(err) {
    console.log(err);
  }
}

syncSeed();