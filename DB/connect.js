

const mysql = require("mysql2");
require("dotenv").config();

let pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise();



const getAllRows = async () => {
    const res = await pool.query("SELECT * FROM employee");
    return res[0]
}

// getAllRows()
// .then( (res) => {
    
//     console.log(res);
// })
// .catch( (err) => {
//     console.log("error in accessing data..");
// })


const getRow = async (id) => {
    let QUERY = `SELECT * FROM employee WHERE empID=?`;
    const emp = await pool.query(QUERY, [id])
    // return res[0];

    QUERY = `SELECT * FROM relatives WHERE empID=?`;
    const rel = await pool.query(QUERY, [id])

    return {
        "employee": emp[0],
        "Contacts": rel[0]
    }
}

// getRow(2)
// .then( (res) => {
//     console.log(res);
// })
// .catch( (err) => {
//     console.log(err);
// })


// empDetails is a object, contacts is an array of objects.. 
const createRow = async (empDetails, contacts) => {

    let QUERY = `INSERT INTO employee (
        name, 
        job_title, 
        phone, 
        email, 
        address, 
        city, 
        state
    ) VALUES ( ?, ?, ?, ?, ?, ?, ?)`;

    let values = [  empDetails.name, 
                    empDetails.job_title, 
                    empDetails.phone, 
                    empDetails.email, 
                    empDetails.address, 
                    empDetails.city, 
                    empDetails.state ]


    const emp = await pool.query(QUERY, values)
    const id = emp[0].insertId;


    for(let each of contacts){
        QUERY = `INSERT INTO relatives (
            name, 
            phone, 
            relation, 
            empID ) VALUES (?, ?, ?, ?)`;

        values = [each.name, each.phone, each.relation, id]
        await pool.query(QUERY, values)
    }

    return {
        empID: id,
        message: `employee ${empDetails.name} added with total ${contacts.length} contacts.`
    }

}


// createRow("Mohan")
// .then( (res) => {
//     console.log(res);
// })
// .catch( (err) => {
//     throw(err);
// })


const updateRow = async (id, name) => {
    const QUERY = `UPDATE test SET name=? WHERE id=?`;
    const res = await pool.query(QUERY, [name, id])
    return {
        id: id,
        name: name,
        message: `total ${res[0].affectedRows} rows affected..`
    };
}

// updateRow(4, "fuck")
// .then( (res) => {
//     console.log(res);
// })
// .catch( (err) => {
//     throw(err);
// })


const deleteRow = async (id) => {
    let QUERY = `DELETE FROM relatives WHERE empID=?`;
    const rel = await pool.query(QUERY, [id])

    QUERY = `DELETE FROM employee WHERE empID=?`;
    const emp = await pool.query(QUERY, [id])

    return {
        message: `total ${rel[0].affectedRows} relatives and ${emp[0].affectedRows} employee deleted.`
    };
}

// deleteRow(4)
// .then( (res) => {
//     console.log(res);
// })
// .catch( (err) => {
//     throw(err);
// })





module.exports = {getAllRows, getRow, createRow, updateRow, deleteRow}


