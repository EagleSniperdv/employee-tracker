// Required packages
const db = require('./db/connection')
const inquirer = require('inquirer')

const choiceList = [
  {
    type: 'list',
    name: 'choiceList',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee Role',
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
    department.department_name AS department, 
    role.salary,
    employee.manager_id AS manager
    FROM employee, role, department 
    WHERE department.id = role.department_id 
    AND role.id = employee.role_id
    ORDER BY employee.id ASC`
  db.query(query, (err, response) => {
    if (err) {
      throw new Error(err)
    } else {
      console.log('Viewing all employees:')
      for (i = 0; i < response.length; i++) {
        if (response[i].manager === null) {
          response[i].manager = true
        } else {
          response[i].manager = `${
            response[response[i].manager - 1].first_name
          } ${response[response[i].manager - 1].last_name}`
        }
      }
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
  let employees = []
  const query = `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
  FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`
  db.query(query, (err, response) => {
    if (err) {
      throw new Error(err)
    } else {
      response.forEach((employee) => {
        employees.push({
          id: `${employee.id}`,
          fullName: `${employee.first_name} ${employee.last_name}`,
        })
      })

      const secondQuery = `SELECT role.id, role.title FROM role`
      db.query(secondQuery, (err, response) => {
        if (err) {
          throw new Error(err)
        } else {
          let roles = []
          response.forEach((role) => {
            roles.push(role.title)
          })

          inquirer
            .prompt([
              {
                name: 'employeesList',
                type: 'list',
                message: 'Which employee has a new role?',
                choices: employees.map((names) => names.fullName),
              },
              {
                name: 'rolesList',
                type: 'list',
                message: 'What is their new role?',
                choices: roles,
              },
            ])
            .then((answer) => {
              let roleId
              let employeeId

              response.forEach((role) => {
                if (answer.rolesList === role.title) {
                  roleId = role.id
                }

                employees.map((name) => {
                  if (answer.employeesList === name.fullName) {
                    employeeId = name.id
                  }
                })
              })

              const thirdQuery = `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`
              db.query(thirdQuery, [roleId, employeeId], (err) => {
                if (err) {
                  throw new Error(err)
                } else {
                  console.log(
                    '\x1b[32m Employees role has been updated! \x1b[0m'
                  )
                  setTimeout(() => {
                    viewAllEmployees()
                  }, 1000)
                }
              })
            })
        }
      })
    }
  })
}
// Function for viewing all roles
const viewAllRoles = () => {
  console.log('Viewing All Employee Roles:')
  const query = `SELECT role.id, role.title, role.salary, department.department_name
                  FROM role
                  INNER JOIN department ON role.department_id = department.id`
  db.query(query, (err, response) => {
    if (err) {
      throw new Error(err)
    } else {
      console.table(response)
      showPrompt()
    }
  })
}
// Function for adding a role
const addRole = () => {
  const query = `SELECT * FROM department`
  db.query(query, (err, response) => {
    if (err) {
      throw new Error(err)
    } else {
      let departmentNames = []
      response.forEach((department) => {
        departmentNames.push(department.department_name)
      })
      departmentNames.push('Create Department')
      inquirer
        .prompt([
          {
            name: 'newDepartmentName',
            type: 'list',
            message: 'Which department is the new role in?',
            choices: departmentNames,
          },
        ])
        .then((answer) => {
          if (answer.newDepartmentName === 'Create Department') {
            addDepartment()
          } else {
            addNewRole(answer)
          }
        })

      const addNewRole = (data) => {
        inquirer
          .prompt([
            {
              name: 'newRole',
              type: 'input',
              message: 'What is the name of your new role?',
            },
            {
              name: 'salary',
              type: 'input',
              message: 'What is the salary of this new role?',
            },
          ])
          .then((answer) => {
            const createdRole = answer.newRole
            const salary = answer.salary
            let departmentId

            response.forEach((department) => {
              if (data.newDepartmentName === department.department_name) {
                departmentId = department.id
              }
            })

            const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
            let params = [createdRole, salary, departmentId]

            db.query(query, params, (err) => {
              if (err) {
                throw new Error(err)
              } else {
                console.log(`\x1b[32m ${createdRole} role created! \x1b[0m`)
              }
              setTimeout(() => {
                viewAllRoles()
              }, 1000)
            })
          })
      }
    }
  })
}
// Function for viewing all departments
const viewAllDepartments = () => {
  const query = `SELECT department.id, department.department_name FROM department`
  db.query(query, (err, response) => {
    if (err) {
      throw new Error(err)
    } else {
      console.log('Viewing All Departments:')
      console.table(response)
      setTimeout(() => {
        showPrompt()
      }, 1000)
    }
  })
}
// Function for adding a department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: 'newDepartment',
        type: 'input',
        message: 'What is the name of the new department?',
      },
    ])
    .then((answer) => {
      const query = `INSERT INTO department (department_name) VALUES (?)`
      db.query(query, answer.newDepartment, (err, response) => {
        if (err) {
          throw new Error(err)
        } else {
          console.log(
            `\x1b[32m ${answer.newDepartment} department created! \x1b[0m`
          )
          setTimeout(() => {
            viewAllDepartments()
          }, 1000)
        }
      })
    })
}
// Function for closing the app
const closeApp = () => {
  db.end()
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
