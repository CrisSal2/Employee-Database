
-- Creates database and connects to it
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;


CREATE TABLE department (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);

CREATE TABLE employee (
    id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
);