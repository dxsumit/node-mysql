

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


// empUpdate and relUpdate are object with parameters to update...
const updateRow = async (empID, empUpdate, relID, relUpdate) => {
    
    let QUERY, emp, rel, totalRows = 0;
    let text = "";
    let values = [];

    // update the employee details..
    if(empUpdate){
        
        for(let each in empUpdate){
            if(empUpdate[each].length == 0){
                continue;
            }
            values.push(empUpdate[each])
            text += each + "=?, "
        }

        text = text.slice(0, text.length-2)
        totalRows += values.length
        values.push(empID)
        QUERY = `UPDATE employee SET ${text} WHERE empID=?`
        emp = await pool.query(QUERY, values)
    }

    if(relID){
        text = "";
        values = [];

        for(let each in relUpdate){
            if(relUpdate[each].length == 0){
                continue;
            }
            text += each + "=?, "
            values.push(relUpdate[each])
        }

        text = text.slice(0, text.length-2)
        totalRows += values.length
        values.push(relID)

        QUERY = `UPDATE relatives SET ${text} WHERE relativeID=?`

        rel = await pool.query(QUERY, values)
    }

    return {
        id: empID,
        message: `total ${totalRows} items affected..`

    }

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


