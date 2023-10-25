const inquirer = require("inquirer");
const db = require("./conection");

function init() {
  const questions = [
    {
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "Add Department",
        "Delete Department",
        "View All Roles",
        "Add Role",
        "Update Employee Role",
        "Delete Role",
        "View All Employees",
        "Add Employee",
        "Delete Employee",
        "Quit",
      ],
      name: "action",
    },
  ];

  inquirer.prompt(questions).then((response) => {
    const { action } = response;
    switch (action) {
      case "View All Departments":
        viewAllDepartments();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Delete Department":
        deleteDepartment();
        break;
      case "View All Roles":
        viewAllRoles();
        break;
      case "Add Role":
        addRole();
        break;
      case "Update Employee Role":
        updateEmployeeRole();
        break;
      case "Delete Role":
        deleteRole();
        break;
      case "View All Employees":
        viewAllEmployees();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Delete Employee":
        deleteEmployee();
        break;
      case "Quit":
        console.log("Quitting application... Goodbye!");
        db.end();
        break;
    }
  });
}

function viewAllDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.error(err);
    } else {
      console.log(results);
      init();
    }
  });
}

function viewAllRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) {
      console.error(err);
    } else {
      console.log(results);
      init();
    }
  });
}

function viewAllEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) {
      console.error(err);
    } else {
      console.log(results);
      init();
    }
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the department name:",
        name: "departmentName",
      },
    ])
    .then((response) => {
      const { departmentName } = response;
      db.query(
        "INSERT INTO department (department_name) VALUES (?)",
        [departmentName],
        function (err, results) {
          if (err) {
            console.error(err);
          } else {
            console.log(`Department '${departmentName}' added successfully.`);
            init();
          }
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the role name:",
        name: "roleName",
      },
      {
        type: "input",
        message: "Enter role salary:",
        name: "roleSalary",
      },
      {
        type: "input",
        message: "Enter department ID:",
        name: "departmentId",
      },
    ])
    .then((response) => {
      const { roleName, roleSalary, departmentId } = response;
      db.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [roleName, roleSalary, departmentId],
        function (err, results) {
          if (err) {
            console.error(err);
          } else {
            console.log(`'${roleName}' added successfully.`);
            init();
          }
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "First name:",
        name: "firstName",
      },
      {
        type: "input",
        message: "Last name:",
        name: "lastName",
      },
      {
        type: "input",
        message: "Role ID:",
        name: "roleId",
      },
      {
        type: "input",
        message: "Manager ID:",
        name: "managerId",
      },
    ])
    .then((response) => {
      const { firstName, lastName, roleId, managerId } = response;
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [firstName, lastName, roleId, managerId],
        function (err, response) {
          if (err) {
            console.error(err);
          } else {
            console.log(`New employee added successfully.`);
            init();
          }
        }
      );
    });
}

function updateEmployeeRole() {
  db.query(
    "SELECT id, first_name, last_name FROM employee",
    function (err, employees) {
      if (err) {
        console.error(err);
      } else {
        const employeeChoices = employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              message: "Select an employee to update:",
              choices: employeeChoices,
              name: "employeeId",
            },
            {
              type: "input",
              message: "Enter the new role ID:",
              name: "newRoleId",
            },
          ])
          .then((response) => {
            const { employeeId, newRoleId } = response;
            db.query(
              "UPDATE employee SET role_id = ? WHERE id = ?",
              [newRoleId, employeeId],
              function (err, results) {
                if (err) {
                  console.error(err);
                } else {
                  console.log(`Employee role updated successfully.`);
                  init();
                }
              }
            );
          });
      }
    }
  );
}

function deleteDepartment() {
  db.query(
    "SELECT id, department_name FROM department",
    function (err, departments) {
      if (err) {
        console.error(err);
      } else {
        const departmentChoices = departments.map((department) => ({
          name: department.department_name,
          value: department.id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              message: "Select a department to delete:",
              choices: departmentChoices,
              name: "departmentId",
            },
          ])
          .then((response) => {
            const { departmentId } = response;
            db.query(
              "DELETE FROM department WHERE id = ?",
              [departmentId],
              function (err, results) {
                if (err) {
                  console.error(err);
                } else {
                  console.log(
                    `Department with ID ${departmentId} deleted successfully.`
                  );
                  init();
                }
              }
            );
          });
      }
    }
  );
}

function deleteEmployee() {
  db.query(
    "SELECT id, first_name, last_name FROM employee",
    function (err, employees) {
      if (err) {
        console.error(err);
      } else {
        const employeeChoices = employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              message: "Select an employee to delete:",
              choices: employeeChoices,
              name: "employeeId",
            },
          ])
          .then((response) => {
            const { employeeId } = response;
            db.query(
              "DELETE FROM employee WHERE id = ?",
              [employeeId],
              function (err, results) {
                if (err) {
                  console.error(err);
                } else {
                  console.log(
                    `Employee with ID ${employeeId} deleted successfully.`
                  );
                  init();
                }
              }
            );
          });
      }
    }
  );
}

function deleteRole() {
  db.query("SELECT id, title FROM role", function (err, roles) {
    if (err) {
      console.error(err);
    } else {
      const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            message: "Select a role to delete:",
            choices: roleChoices,
            name: "roleId",
          },
        ])
        .then((response) => {
          const { roleId } = response;
          db.query(
            "DELETE FROM role WHERE id = ?",
            [roleId],
            function (err, results) {
              if (err) {
                console.error(err);
              } else {
                console.log(`Role with ID ${roleId} deleted successfully.`);
                init();
              }
            }
          );
        });
    }
  });
}

module.exports = {
  init,
};
