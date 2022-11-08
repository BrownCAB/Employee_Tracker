-- Write code here or enter directly in MySQL shell --

-- Drops the employee_db if it exists currently --
DROP DATABASE IF EXISTS employee_db;

-- Creates the  employee_db database --
CREATE DATABASE employee_db;

-- Use employee_db --
USE employee_db;

-- Creates the tables --
CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)  NULL -- to hold department name --
);

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NULL, -- to hold role title --
    salary DECIMAL(10.3) NULL, -- to hold role salary --
    department_id INT NULL, -- to hold reference to department role belongs to --
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NULL, -- to hold employee first name --
    last_name VARCHAR(30) NULL, -- to hold employee last name --
    role_id INT NULL, -- to hold reference to employee role --
    manager_id INT NULL, -- to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)--
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
