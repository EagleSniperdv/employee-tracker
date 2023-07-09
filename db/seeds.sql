INSERT INTO department(department_name)
VALUES("Operations"), ("Research and Development"), ("Sales"), ("Human Resources"), ("Customer Service");

INSERT INTO role(title, salary, department_id)
VALUES("Lead Tech", 55000, 1), ("Senior Tech", 85000, 1), ("Chemist", 125000, 2), ("Sales Executive", 350000, 3), ("Hr Manager", 90000, 4), ("Representative", 55000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Mike', 'Thompson', 1, 2), ('Mark', 'Jones', 1, null), ('Neal', 'Chancey', 1, 2), ('Christian', 'Martinez', 2, 2), ('James', 'Dunn', 4, null) , ('Carlos', 'Santana', 5, null);