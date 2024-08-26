-- Comment on the right is the automatic department id it's given
INSERT INTO department (name) VALUES 
('Sales'), -- 1
('Engineering'), -- 2
('Finance'), -- 3
('Legal'); -- 4

-- Comment on the right is the automatic role id it's given
INSERT INTO role (title, salary, department_id) VALUES 
('Sales Lead', 80000, 1), -- 1
('Salesperson', 50000, 1), -- 2
('Lead Engineer', 100000, 2), -- 3
('Software Engineer', 80000, 2), -- 4
('Account Manager', 90000, 3), -- 5
('Accountant', 75000, 3), --6
('Leagal Team Lead', 120000, 4), -- 7
('Lawyer', 95000, 4); -- 8


INSERT INTO employee (first_name, last_name, role_id) VALUES
('Cris', 'Salgado', 4),
('Kate', 'Salgado', 3),
('Leanne', 'Salgado', 5),
('David', 'Haig', 6),
('Kevin', 'Marx', 1),
('Jake', 'Hamlin', 2),
('Abinadi', 'Cruz', 7),
('Nathaniel', 'Spence', 8),
('Genji', 'Shimada', 4);
