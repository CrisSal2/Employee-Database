require('dotenv').config();
const { Pool } = require('pg');






const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASS,
});






const viewDepartments = async () => {
  try {
    const res = await pool.query('SELECT * FROM department');
    return res.rows;
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
};









const viewRoles = async () => {
  try {
    const res = await pool.query('SELECT r.id, r.title, r.salary, d.name AS department FROM role r JOIN department d ON r.department_id = d.id'); // run query to get all roles
    return res.rows; 
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
};










const viewEmployees = async () => {
  try {
    const res = await pool.query(`
      SELECT e.id, e.first_name, e.last_name, r.title AS role, r.salary, d.name AS department,
             COALESCE(first_name || ' ' || last_name)
      FROM employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
    `);
    return res.rows;
  } catch (err) {
    console.error("Error executing query", err.stack);
  }
};











const addDepartment = async (name) => {
  try {
    await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log(`Added department: ${name}`);
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
};









const addRole = async (title, salary, departmentName) => {
  try {
    const depRes = await pool.query('SELECT id FROM department WHERE name = $1', [departmentName]);
    const departmentId = depRes.rows[0].id;
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
    console.log(`Added role: ${title}`);
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
};









const addEmployee = async (first_name, last_name, roleTitles) => {
  try {
    const roleRes = await pool.query('SELECT id FROM role WHERE title = $1', [roleTitles]);
    const roleId = roleRes.rows[0].id;
    await pool.query('INSERT INTO employee (first_name, last_name, role_id) VALUES ($1, $2, $3)', [first_name, last_name, roleId]);
    console.log(`Added employee: ${first_name} ${last_name}`);
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
};












const updateEmployeeRole = async (employeeName, roleTitles) => {
  try {
    const employeeNames = employeeName.split(' ');
    const roleRes = await pool.query('SELECT id FROM role WHERE title = $1', [roleTitles]);
    const roleId = roleRes.rows[0].id;

    await pool.query('UPDATE employee SET role_id = $1, WHERE first_name = $2 AND last_name = $3', [roleId, employeeNames[0], employeeNames[1]]);
    console.log(`Updated employee: ${employeeName} with new role: ${roleTitles}`);
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
};











module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};