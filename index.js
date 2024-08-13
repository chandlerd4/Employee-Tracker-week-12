const inquirer = require('inquirer');
const { query } = require('./db');

// Main menu prompt
const mainMenu = async () => {
  try {
    const { choice } = await inquirer.prompt({
      name: 'choice',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Exit',
      ],
    });

    const actions = {
      'View All Departments': viewDepartments,
      'View All Roles': viewRoles,
      'View All Employees': viewEmployees,
      'Add Department': addDepartment,
      'Add Role': addRole,
      'Add Employee': addEmployee,
      'Update Employee Role': updateEmployeeRole,
      'Exit': () => process.exit()
    };

    await actions[choice]();
  } catch (err) {
    console.error('Error in mainMenu:', err);
  }
};

// Handle errors and call main menu
const handleMenuError = async (fn) => {
  try {
    await fn();
  } catch (err) {
    console.error(`Error: ${err.message}`);
  } finally {
    mainMenu();
  }
};

// View all departments
const viewDepartments = () => handleMenuError(async () => {
  const res = await query('SELECT * FROM department');
  console.table(res.rows);
});

// View all roles
const viewRoles = () => handleMenuError(async () => {
  const res = await query(
    `SELECT role.id, role.title, role.salary, department.name AS department
     FROM role
     JOIN department ON role.department_id = department.id`
  );
  console.table(res.rows);
});

// View all employees
const viewEmployees = () => handleMenuError(async () => {
  const res = await query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
  
