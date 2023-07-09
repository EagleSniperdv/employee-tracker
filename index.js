// Required packages
const inquirer = require('inquirer')

const choiceList = [
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
const init = () => {
  inquirer.prompt(choiceList).then((answer) => {
    const choice = answer.choiceList
    if (choice === 'View All Employees') {
      viewAllEmployees()
    }

    if (choice === 'Add Employee') {
      addEmployee()
    }

    if (choice === 'Update Employee Role') {
      updateEmployeeRole()
    }

    if (choice === 'View All Roles') {
      viewAllRoles()
    }

    if (choice === 'Add Role') {
      addRole()
    }

    if (choice === 'View All Departments') {
      viewAllDepartments()
    }

    if (choice === 'Add Department') {
      addDepartment()
    }

    if (choice === 'Quit') {
      closeApp()
    }
  })
}
// Function call to initialize app
init()
