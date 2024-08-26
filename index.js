const inquirer = require('inquirer');
require('dotenv').config();
const {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
} = require('./actions');


/******************************************** Inquirer prompt ********************************************/


const startMenu = async () => {
    const answer = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Exit'
      ],
    });
    switch (answer.action) {

        case 'View All Employees':
            const employees = await viewEmployees();
            console.table(employees);
        break;

        case 'Add Employee':
            await promptAddEmployee();
        break;

        case 'Update Employee Role':
            await promptUpdateEmployeeRole();
        break;

        case 'View All Roles':
            const roles = await viewRoles();
            console.table(roles);
        break;

        case 'Add Role':
            await promptAddRole();
        break;

        case 'View All Departments':
            const departments = await viewDepartments();
            console.table(departments);
        break;

        case 'Add Department':
            await promptAddDepartment();
        break;

        case 'Exit':
        process.exit();
    }
    startMenu(); //Returns to start menu after selection is done
};


// Function to create a new Department

const promptAddDepartment = async () => {
    const answer = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'Enter the name of the new department:',
    });
    await addDepartment(answer.name);
};


// Function to create a new Role

const promptAddRole = async () => {
    const departments = await viewDepartments();
    const departmentNames = departments.map(dep => dep.name);
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the new role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the new role:',
      },
      {
        type: 'list',
        name: 'department',
        message: 'Select the department for the new role:',
        choices: departmentNames,
      },
    ]);
    await addRole(answers.title, answers.salary, answers.department);
};


// Function to create a new Employee

const promptAddEmployee = async () => {
    const roles = await viewRoles();
    const roleTitles = roles.map(role => role.title);
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the first name of the new employee:',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the last name of the new employee:',
      },
      {
        type: 'list',
        name: 'role',
        message: 'Select the role for the new employee:',
        choices: roleTitles,
      },
    ]);
    await addEmployee(answers.first_name, answers.last_name, answers.role);
};


// Function to Update an Employee Role

const promptUpdateEmployeeRole = async () => {
  const employees = await viewEmployees();
  const employeeNames = employees.map(emp => `${emp.first_name} ${emp.last_name}`);
  const roles = await viewRoles();
  const roleTitles = roles.map(role => role.title);
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Select the employee to update:',
      choices: employeeNames,
    },
    {
      type: 'list',
      name: 'role',
      message: 'Select the new role for the employee:',
      choices: roleTitles,
    },
  ]);
  await updateEmployeeRole(answers.employee, answers.role);
};


// initializes app
startMenu();