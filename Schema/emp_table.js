
CREATE TABLE IF NOT EXISTS employee (
    
    empID int AUTO_INCREMENT PRIMARY KEY,
    name varchar(50),
    job_title varchar(50),
    phone varchar(10),
    email varchar(30),
    address varchar(100),
    city varchar(30),
    state varchar(30)
);


CREATE TABLE IF NOT EXISTS relatives (
    
    relativeID int AUTO_INCREMENT PRIMARY KEY ,
    name varchar(50),
    phone varchar(10),
    relation varchar (20),
    empID int,
    FOREIGN KEY (empID) REFERENCES employee(empID)
);





INSERT INTO employee (name, job_title, phone, email, address, city, state) VALUES ("sumit", "admin", "1234567890", "admin@gmail.com", "xyz", "xyz", "TN");


INSERT INTO relatives (name, phone, relation, empID) VALUES ("relative", "1234567890", "unknown", 1);


