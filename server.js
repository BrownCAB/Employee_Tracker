// Import and require dependencies 
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

let query; 

// Connect to database
const connection = mysql.createConnection
    ({
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
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Roles",
            "View All Departments",
            "Add Department",
            // Bonus: 
            // "View All employees by manager",
            // "View All employees by department",
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
            case "View All Employees":
                viewAllEmps();
                break;
            case "Add Employee":
                addEmps();
                break;
            case "Update Employee Role":
                updateEmpsRole();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Roles":
                addRoles();
                break;
            case "View All Departments":
                viewAllDepts();
                break;
            case "Add Department":
                addDept();
                break;

            //Bonus:
            // case "View All employees by manager",
            //     viewAllEmpsByMgr();
            //     break;
            // case "View All employees by department"
            //     viewAllEmpsByDept(); 
            //     break;
            // case "Update employee managers"
            //      updateEmpsMgrs();
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
    query =
    `SELECT employee.id, employee.first_name, role.title, department.name 
    AS department, role.salary, 
    CONCAT() 
    `
}

//=== Function View all roles ===//
function viewAllRoles() {
    query =
    `
    `
}

//=== Function View all employees ===//
function viewAllEmps() {
    query =
    `
    `
}

//=== Function Add a department ===//
function addDept() {
    query =
    `
    `
 // What is the name of the department?
}

//=== Function Add a roles ===//
function addRoles() {
    query = 
    `
    `
// What is the name of the role?
}

//=== Function Add a employee ===//
function addEmps() {
    query =
    `
    `
// What is the first name of the employee?
// What is the last name of the employee?
}

//=== Function Update Employee role ===//
function updateEmpsRole() {
    query =
    `
    `
// What is the role you want to change? Choices
// What is the new name of role?
}

//=== Bonus Functions ===//
// function viewAllEmpsByMgr() {}


// function viewAllEmpsByDept() {}


//  function updateEmpsMgrs() {}


// function deleteDepts() {}


// function deleteRoles() {}


// function deleteEmps() {}


// function allSalaries() {}
