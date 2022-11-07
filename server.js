// Import and require dependencies 
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");
const sql = require("./sql"); 

// Connect to database
const connection = mysql.createConnection({
        // MySQL username,
        host: 'localhost',
        // Port
        port: 3306,
        // Username
        user: 'root',
        // MySQL password
        password: '',
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
            // "View all employees by department",
            // "Update employee managers",
            // "Delete departments", 
            // "Delete roles",
            // "Delete employees",
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
            // case "View all employees by manager",
            //     viewAllEmpsByMgr();
            //     break;
            // case "View all employees by department"
            //     viewAllEmpsByDept(); 
            //     break;
            // case "Update Employee managers"
            //     updateEmpsMgrs();
            //     break;
            // case "Delete departments"
            //     deleteDepts(); 
            //     break;
            // case "Delete roles"
            //     deleteRoles(); 
            //     break;
            // case "Delete employees"
            //     deleteEmps(); 
            //     break;
            // case "Aggregate all department salaries",
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
    'SELECT * FROM department';

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
    'SELECT * FROM role';

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
    'SELECT * FROM employee.id, employee.first_name, employee.last_name, role.id, department, role.salary, employee.manager_id';

    connection.query(query, function (err, res) {
        if (err) throw err;
    
        console.table(res);
        console.log("Departments viewed!\n");
    
        firstPrompt();
      });
}

//=== Function Add a department ===//
function addDept() {
    console.log("Adding an department!")
    // What is the name of the department?
    let query =
    `SELECT `

    connection.query(query, function (err, res) {
        if (err) throw err;
    
        console.table(res);
        console.log("Department added!\n");
    
        firstPrompt();
      });
}

//=== Function Add a roles ===//
function addRoles() {
    console.log("Adding roles!")
    // Add the name, salary, and department for the role?
    let query = 
    `SELECT employee.first_name, employee.last_name`

    connection.query(query, function (err, res) {
        if (err) throw err;
    
        console.table(res);
        console.log("Roles added!\n");
    
        firstPrompt();
      });
}

//=== Function Add a employee ===//
function addEmps() {
    console.log("Adding an employee!")
    // What is the employee’s first name, last name, role, and manager and is added to the database?
    let query =
    `SELECT id, title, salary FROM role`

    connection.query(query, function (err, res) {
        if (err) throw err;

        const roleChoices = res.map(({ id, title, salary }) => ({
            value: id, title: `${title}`, salary: `${salary}`
          }));
    
        console.table(res);
        console.log("Employees added!");
    
        firstPrompt();
      });
}

//=== Function Update Employee role ===//
function updateEmpsRole() {
    console.log("Updating an employee role!")
    // Which employee needs to be update and their new role and this information
    let query =
    `SELECT `

    connection.query(query, function (err, res) {
        if (err) throw err;
    
        console.table(res);
        console.log("Employees role updated!\n");
    
        firstPrompt();
      });
}

//=== Bonus Functions ===//
// function viewAllEmpsByMgr() {}


// function viewAllEmpsByDept() {}


//  function updateEmpsMgrs() {}


// function deleteDepts() {}


// function deleteRoles() {}


// function deleteEmps() {}


// function allSalaries() {}

firstPrompt();