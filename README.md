# node-mysql

## REST API for Management of Employees and their Contacts.
To run the project locally 
<ul>
  <li> Clone the repository in local computer. </li>
  <li> run – “npm install” in the project directory to download all the dependencies.  </li>
  <li> Make sure to update Database details in <b>DB/connect.js</b> file, To work with mysql make sure you have database with <b>“employee”</b> and <b>“relatives”</b> table, you can check schema of the tables in <b>Schema/emp_table.js</b> file. Create them manually and start the server. </li>
  <li> After everything has done, start the node server by running <b>“npm run dev”</b> in same project directory. </li>
</ul>

### Structure of MYSQL database
Two Tables – Employee table and Relatives table, both are mapped with a foreign key, which means each employee have few (could be any number) relatives in Relative table.



### Functionality of API 
API - http://localhost:4000/api/employee

CRUD operations can be performed on both tables. Validations and checks on input values has also been implemented using <b>express-validator</b>.

### Create Employee and his Relatives. [POST Method]
<a href="#"> http://localhost:4000/api/employee/add </a>

<b> structure of body to be passed. </b>
```
      {
        "empDetails": {
              "name": "John Nguyen",
              "job_title": "Professor",
              "phone": "7890123456",
              "email": "johnnguyen@example.com",
              "address": "xyz", 
              "city": "xyz", 
              "state": "IL"
            },
        "contacts": [
              {
                  "name": "David Lee",
                  "phone": "4567890123",
                  "relation": "Friend"
              },
              {
                  "name": "Michael Rodriguez",
                  "phone": "6789012345",
                  "relation": "Brother"
              }
            ]

      }
```

Number of contacts can be more than 2 also.
Fields like name, job_title, phone, email are compulsory others can be empty, at least 1 contact is mandatory.
Based on json inputs, success/failed response will return.

### Read Employees with pagination. [GET Method]
<a href="#"> http://localhost:4000/api/employee/get </a> <br>
<a href="#"> http://localhost:4000/api/employee/get?page=2 </a> <br>
<a href="#"> http://localhost:4000/api/employee/get?page=2&count=4 </a> <br>

By default, each request will serve 5 items per page but that can be updated by passing query.
Request will return only details of the employees not relatives details since each employee doesn’t have fixed number of contacts, its redundant to return them in same request. [Full details can be accessed in other type of request] 

### Find the Employee [GET Method]
<a href="#"> http://localhost:4000/api/employee/find/:/id </a> <br>

To get the entire details of an employee including personal and relatives details we can use this.
We need to pass the empID of the employee whom details we want to fetch, empID can be passed as a parameter.

### Update details of the Employee [PATCH Method]
We can update either employee details or his contacts details or even both in just a single request.
empID of the employee must be passed as a parameter whom we want to update.

<a href="#"> http://localhost:4000/api/employee/update/:id </a> <br>

Since we have multiple relatives for each employee we also need to specify which relative we are updating for that we can pass relID in body of the request.

structure of body to be passed.
```
{
		"empUpdate": {
        	  "name": "New Name",
        	  "job_title": "New title"
    		},
		"relUpdate": {
        	  "relID": 12,
 	          "name": "New Name"
    		}
}
```

We can pass only those fields which need to be updated leaving rest of them as it is.
<b>“relID” is important to pass if we are updating relative details.</b>

<b> Other body variants that are also accepted. </b>
```
{
	"empUpdate": {
          "name": "New Name",
          "job_title": "New title"
      }
}

```
```
{
	"relUpdate": {
          "relID": 12,
          "name": "New Name"
      }
}

```

### Delete Employee with all his relatives contacts [DELETE Method]
For deleting an Employee, we need to pass the id of the employee as a parameter, based on that employee and his contacts will be deleted. 
<a href="#"> http://localhost:4000/api/employee/delete/:id </a> <br>











