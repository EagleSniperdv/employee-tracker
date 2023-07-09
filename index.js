// Required packages
const db = require('./db/connection')
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
  const query = `SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.department_name, 
    role.salary
    FROM employee, role, department 
    WHERE department.id = role.department_id 
    AND role.id = employee.role_id
    ORDER BY employee.id ASC`
  db.query(query, (err, response) => {
    if (err) {
      throw new Error(err)
    } else {
      console.log('Viewing all employees:')
      console.table(response)
    }
    showPrompt()
  })
}
// Function for adding an employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
        validate: (firstName) => {
          if (firstName) {
            return true
          } else {
            console.log('Please enter a first name')
            return false
          }
        },
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
        validate: (lastName) => {
          if (lastName) {
            return true
          } else {
            console.log('Please enter a last name')
            return false
          }
        },
      },
    ])
    .then((answer) => {
      const fullName = [answer.firstName, answer.lastName]
      const query = `SELECT role.id, role.title FROM role`
      db.query(query, (err, response) => {
        if (err) {
          throw new Error(err)
        } else {
          const allRoles = response.map(({ id, title }) => ({
            name: title,
            value: id,
          }))
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'allRoles',
                message: "What is the employee's role?",
                choices: allRoles,
              },
            ])
            .then((answer) => {
              const role = answer.allRoles
              fullName.push(role)
              const query = `SELECT * FROM employee`
              db.query(query, (err, response) => {
                if (err) {
                  throw new Error(err)
                } else {
                  const allManagers = response.map(
                    ({ id, first_name, last_name }) => ({
                      name: first_name + ' ' + last_name,
                      value: id,
                    })
                  )
                  inquirer
                    .prompt([
                      {
                        type: 'list',
                        name: 'allManagers',
                        message: "Who is the employee's manager?",
                        choices: allManagers,
                      },
                    ])
                    .then((answer) => {
                      const manager = answer.manager
                      fullName.push(manager)
                      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`
                      db.query(query, fullName, (err) => {
                        if (err) {
                          throw new Error(err)
                        } else {
                          console.log(
                            '\x1b[32m Employee has been added! \x1b[0m'
                          )
                          setTimeout(() => {
                            viewAllEmployees()
                          }, 1000)
                        }
                      })
                    })
                }
              })
            })
        }
      })
    })
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

// Function to show the prompt
const showPrompt = () => {
  // Method to connect to our db
  db.connect((err) => {
    if (err) {
      throw new Error(err)
    } else {
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
  })
}
// Show the prompt when we start our app
showPrompt()
