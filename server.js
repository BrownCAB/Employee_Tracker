// Import and require dependencies 
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

// Connect to database
const connection = mysql.createConnection({
        // MySQL username,
        host: 'localhost',
        // Port
        port: 3306,
        // Username
        user: 'root',
        // MySQL password
        password: 'CashPass',
        database: 'employee_db'
    });

    connection.connect(function (err) {
        if (err) throw err;
        // Run application 
        firstPrompt();
        });    

// Prompt Choices        
function firstPrompt() {

    inquirer.prompt({
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add department",
            "Add roles",
            "Add employee",
            "Update employee role",
            // Bonus: 
            // "View all employees by manager",
            "View all employees by department",
            // "Update employee managers",
            // "Delete departments", 
            // "Delete roles",
            "Delete employees",
            // "Aggregate all department salaries",
            "Quit"]
    })
    .then(function({ task }) {
        // excutate the different conditions 
        switch (task) {
            case "View all departments":
                viewAllDepts();
                break;
            case "View all roles":
                viewAllRoles();
                break; 
            case "View all employees":
                viewAllEmps();
                break;
            case "Add department":
                addDept();
                break;
            case "Add roles":
                addRoles();
                break;
            case "Add employee":
                addEmps();
                break;
            case "Update employee role":
                updateEmpsRole();
                break;
            //Bonus:
            // case "View all employees by manager":
            //     viewAllEmpsByMgr();
            //     break;
            case "View all employees by department":
                viewAllEmpsByDept(); 
                break;
            // case "Update Employee managers":
            //     updateEmpsMgrs();
            //     break;
            // case "Delete departments":
            //     deleteDepts(); 
            //     break;
            // case "Delete roles":
            //     deleteRoles(); 
            //     break;
            case "Delete employees":
                deleteEmps(); 
                break;
            // case "Aggregate all department salaries":
            //     allSalaries();
            //     break;

            // End Queries to MySQL            
            case "Quit":
                connection.end();
                break;
        }
    });
}    

//=== Function View all departments === //
function viewAllDepts() {
    console.log("Viewing all departments");
    // Queries for department names and department ids
    let query =
    `SELECT * FROM department`;

    connection.query(query, function (err, res) {
        if (err) throw err;
    
        console.table(res);
        console.log("Departments viewed!\n");
    
        firstPrompt();
      });
}

//=== Function View all roles ===//
function viewAllRoles() {
    console.log("Viewing all roles");
    // Queries for job title, role_id, the department that role belongs to, and the salary for that role
    let query =
      `SELECT r.id, r.title, r.salary, d.name AS department
      FROM role r
      JOIN department d
      ON r.department_id = d.id`

    connection.query(query, function (err, res) {
        if (err) throw err;
    
        console.table(res);
        console.log("Roles viewed!\n");
    
        firstPrompt();
      });
}

//=== Function View all employees ===//
function viewAllEmps() {
    console.log("Viewing all employees");
    // Queries for employee data, including employee ids, first_names, last_names, job titles, departments, salaries, and managers that the employees report to
    let query =
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN role r
        ON e.role_id = r.id
        LEFT JOIN department d
        ON d.id = r.department_id
        LEFT JOIN employee m
        ON m.id = e.manager_id`

    connection.query(query, function (err, res) {
        if (err) throw err;
    
        console.table(res);
        console.log("Departments viewed!\n");
    
        firstPrompt();
      });
}

//=== Function Add a department ===//
function addDept() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What is the name of the department?",
        },
    ]).then(({ department }) => {
        console.log("Adding an department!")
        // Add Department id and name
        let query =
        `INSERT INTO department (name)
        VALUES ('${department}');`
    
        connection.query(query, function (err, res) {
            if (err) throw err;
        
            console.table(res);
            console.log("Department added!\n");
        
            firstPrompt();
          }); 
    }) 

}

//=== Function Add a roles ===//
function addRoles() {
    console.log("Adding roles!")
    // Add the name, salary, and department for the role?
    let query = 
        `SELECT d.id, d.name, r.salary AS budget
        FROM employee e
        JOIN role r
        ON e.role_id = r.id
        JOIN department d
        ON d.id = r.department_id
        GROUP BY d.id, d.name`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const departmentChoices = res.map(({ id, name }) => ({
      value: id, name: `${id} ${name}`
    }));

    console.table(res);
    console.log("Department array!");

    promptAddRole(departmentChoices);
  });
}

    function promptAddRole(departmentChoices) {

    inquirer
        .prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "What is the role title?"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the role salary?"
        },
        {
            type: "list",
            name: "departmentId",
            message: "What is the Department ID?",
            choices: departmentChoices
        },
        ])
        .then(function (answer) {

        let query = `INSERT INTO role SET ?`
            console.log(answer);
        connection.query(query, {
            title: answer.roleTitle,
            salary: answer.roleSalary,
            department_id: answer.departmentId
        },
            function (err, res) {
            if (err) throw err;

            console.table(res);
            console.log("Role Added!");
        
            firstPrompt();
        });
    });
}

//=== Function Add a employee ===//
function addEmps() {
    console.log("Adding an employee!")
    // What is the employee’s first name, last name, role, and manager and is added to the database?
    let query =
        `SELECT r.id, r.title, r.salary 
        FROM role r`

    connection.query(query, function (err, res) {
        if (err) throw err;

        const roleChoices = res.map(({ id, title, salary }) => ({
            value: id, title: `${title}`, salary: `${salary}`
          }));
    
        console.table(res);
        console.log("Employees info added!");
    
        promptInsert(roleChoices);
    });
  }
  
function promptInsert(roleChoices) {

    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "roleId",
            message: "What is the employee's role?",
            choices: roleChoices
        },
        ])
        .then(function (answer) {
        console.log(answer);

        var query = `INSERT INTO employee SET ?`
        // when finished prompting, insert a new item into the db with that info
        connection.query(query,
            {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.roleId,
            manager_id: answer.managerId,
            },
            function (err, res) {
            if (err) throw err;

            console.table(res);
            console.log(res.insertedRows + "Added successfully!\n");

            firstPrompt();
        });
    });
}

//=== Function Update Employee role ===//
function updateEmpsRole() {
    console.log("Updating an employee role!")
    // Which employee needs to be update and their new role and this information
    employeeArray();

}

function employeeArray() {
  console.log("Updating an employee");

  let query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    JOIN employee m
    ON m.id = e.manager_id`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const employeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${first_name} ${last_name}`      
    }));

    console.table(res);
    console.log("employeeArray To Update!\n")

    roleArray(employeeChoices);
  });
}

function roleArray(employeeChoices) {
  console.log("Updating an role");

  let query =
    `SELECT r.id, r.title, r.salary 
  FROM role r`
  let roleChoices;

  connection.query(query, function (err, res) {
    if (err) throw err;

    roleChoices = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`      
    }));

    console.table(res);
    console.log("roleArray to Update!\n")

    promptEmployeeRole(employeeChoices, roleChoices);
  });
}

function promptEmployeeRole(employeeChoices, roleChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to set with the role?",
        choices: employeeChoices
      },
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to update?",
        choices: roleChoices
      },
    ])
    .then(function (answer) {

      let query = `UPDATE employee SET role_id = ? WHERE id = ?`
      // when finished prompting, insert a new item into the db with that info
      connection.query(query,
        [ answer.roleId,  
          answer.employeeId
        ],
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + "Updated successfully!");

    
        firstPrompt();
        });
    });
}

//=== Bonus Functions ===//
// function viewAllEmpsByMgr() {}

//=== View All Employees By Dept ===//
function viewAllEmpsByDept() {
    console.log("Viewing employees by department\n");

  let query =
    `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    LEFT JOIN role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const departmentChoices = res.map(data => ({
      value: data.id, name: data.name
    }));

    console.table(res);
    console.log("Department view succeed!\n");

    promptDepartment(departmentChoices);
  });
}

// User choose the department list, then employees pop up
function promptDepartment(departmentChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department would you choose?",
        choices: departmentChoices
      }
    ])
    .then(function (answer) {
      console.log("answer ", answer.departmentId);

      let query =
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
        FROM employee e
        JOIN role r
        ON e.role_id = r.id
        JOIN department d
        ON d.id = r.department_id
        WHERE d.id = ?`

      connection.query(query, answer.departmentId, function (err, res) {
        if (err) throw err;

        console.table("response ", res);
        console.log(res.affectedRows + "Employees are viewed!\n");

        firstPrompt();
      });
    });
}

//  function updateEmpsMgrs() {}


// function deleteDepts() {}


// function deleteRoles() {}


function deleteEmps() {
    console.log("Deleting an employee!")

    let query =
    `SELECT e.id, e.first_name, e.last_name
      FROM employee e`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${id} ${first_name} ${last_name}`
    }));

    console.table(res);
    console.log("Deleting employee from array!\n");

    promptDelete(deleteEmployeeChoices);
  });
}

// User choose the employee list, then employee is deleted
function promptDelete(deleteEmployeeChoices) {

  inquirer.prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: deleteEmployeeChoices
      }
    ])
    .then(function (answer) {

      let query = `DELETE FROM employee WHERE ?`;
      // when finished prompting, insert a new item into the db with that info
      connection.query(query, { id: answer.employeeId }, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(res.affectedRows + "Deleted!\n");
    
        firstPrompt();
        });
    });  
}

// function allSalaries() {}
