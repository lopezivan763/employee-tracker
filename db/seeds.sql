INSERT INTO department (department_name)
VALUES ('Human Resources'),
('Finance'),
('Marketing'),
('Research and Development');

INSERT INTO role (title, salary, department_id)
VALUES 
('Manager', 70000.00, 1),
('Developer', 60000.00, 4),
('Accountant', 55000.00, 2),
('Marketing Specialist', 60000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Michael', 'Johnson', 3, 1),
('Emily', 'Williams', 4, 3);
