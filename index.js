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

// Create a function to initialize app
const init = () => {
  inquirer
    .prompt(questions)
    .then((answers) => {
      const { choices } = answers
      console.log(choices)
    })

    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment")
      } else {
        console.log('Something went wrong')
      }
    })
}
// Function call to initialize app
init()
