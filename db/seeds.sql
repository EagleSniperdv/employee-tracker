INSERT INTO department(department_name)
VALUES("Operations"),("Research and Development"),("Sales"),("Human Resources"),("Customer Service");

INSERT INTO role(title, salary, department_id)
VALUES("Technician", 45000, 1),("Lead Technician", 55000, 1),("Operations Manager", 85000, 1),("Chemist", 125000, 2),("Lead Chemist", 155000, 2),("Chemist Manager", 185000, 2),("Sales Associate", 90000, 3),("Sales Lead", 110000, 3),("Sales Manager", 110000, 3),("Hr Associate", 65000, 4),("Hr Lead", 90000, 4),("Hr Manager", 120000, 4),("Representative", 55000, 5),("Lead Representative", 55000, 5),("Customer Service Manager", 55000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('Mike', 'Thompson', 1, 3),('Mark', 'Jones', 2, 3),('Neal', 'Chancey', 3, null),('Travis', 'Schaefer', 4, 6),('Nick', 'Frahm', 5, 6),('Christian', 'Martinez', 6, null),('Courtney', 'Bigelow', 7, 9),('Dallas', 'Stockton', 8, 9),('Patrick', 'Salazar', 9, null),('Misty', 'Boulton', 10, 12),('Aaliyah', 'Rose', 11, 12),('Jacob', 'Gallegos', 12, null),('Shelby', 'Jones', 13, 15),('Thomas', 'White', 14, 15),('Austin', 'Shelton', 15, null);