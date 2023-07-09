// Required packages
const inquirer = require('inquirer')
const mysql = require('mysql2')
require('dotenv').config()

// Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'test',
})

const questions = [
  {
    type: 'list',
    name: 'choiceList',
    message: 'What would you like to do?',
    choices: [
      'View All Employees',
      'Add Employee',
      'Update Employee Role',
      'View All Roles',
      'Add Role',
      'View All Departments',
      'Add Department',
      'Quit',
    ],
  },
]
// Function for viewing all employees
const viewAllEmployees = () => {
  console.log('Viewing all employees')
}
// Function for adding an employee
const addEmployee = () => {
  console.log('Added an employee')
}
// Function for updating an employee role
const updateEmployeeRole = () => {
  console.log('Updated employee role')
}
// Function for viewing all roles
const viewAllRoles = () => {
  console.log('Viewing all roles')
}
// Function for adding a role
const addRole = () => {
  console.log('Added a role')
}
// Function for viewing all departments
const viewAllDepartments = () => {
  console.log('Viewing all departments')
}
// Function for adding a department
const addDepartment = () => {
  console.log('Added a department')
}
// Function for closing the app
const closeApp = () => {
  console.log('App closed')
}

// Create a function to initialize app
const init = async () => {
  const { choices } = await inquirer.prompt(questions)
  console.log(choices)
  if (choices === 'View All Employees') {
    viewAllEmployees()
  }

  if (choices === 'Add Employee') {
    addEmployee()
  }

  if (choices === 'Update Employee Role') {
    updateEmployeeRole()
  }

  if (choices === 'View All Roles') {
    viewAllRoles()
  }

  if (choices === 'Add Role') {
    addRole()
  }

  if (choices === 'View All Departments') {
    viewAllDepartments()
  }

  if (choices === 'Add Department') {
    addDepartment()
  }

  if (choices === 'Quit') {
    closeApp()
  }
}
// Function call to initialize app
init()
