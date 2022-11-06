-- Write code here or enter directly in MySQL shell --

-- Drops the _db if it exists currently --
DROP DATABASE IF EXISTS employee_db

-- Creates the  _db database --
CREATE DATABASE employee_db

-- Use _db --
USE employee_db

-- Creates the tables --
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30)  NULL, -- to hold department name --
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL, -- to hold role title --
    salary DECIMAL(10.3) NULL, -- to hold role salary --
    department_id INT NULL, -- to hold reference to department role belongs to --
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL, -- to hold employee first name --
    last_name VARCHAR(30) NULL, -- to hold employee last name --
    role_id INT NULL, -- to hold reference to employee role --
    manager_id INT NULL, -- to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)--
    PRIMARY KEY (id)
);
