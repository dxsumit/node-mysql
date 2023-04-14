
const router = require("express").Router();

const {getAllRows, getRow, createRow, updateRow, deleteRow} = require('../DB/connect');

router.get('/', (req, res) => {
    res.status(200).json({status: "success", msg: "This is employee api."});
})


// read employess..
router.get('/get', async(req, res) => {
    
    try {
        const result = await getAllRows();
        res.status(200).json({status: 'successful', msg: result});
    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }

})

// find employee..
router.get('/find/:id', async(req, res) => {
    
    try {
        const {id} = req.params;

        const result = await getRow(id);
        if(result.length == 0)
            res.status(200).json({status: 'successful', msg: "ID not found.."});
        else
            res.status(200).json({status: 'successful', msg: result});
    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }
})


// create employee
router.post('/add', async(req, res) => {
    try{
        // const {name} = req.body;
        // if(!name){
        //     return res.status(400).json({"status": "error", "msg": "All fields are required.."})
        // }

        const empDetails = {
            name: "test2",
            job_title: "Jobless2",
            phone: "1234567890",
            email: "jobdedo@gmail.com",
            address: "xyz", 
            city: "xyz", 
            state: "xyz"
        }
        const contacts = [
            {
                name: "name1",
                phone: "0987654321",
                relation: "anjaaan"
            },
            {
                name: "name2",
                phone: "0987654321",
                relation: "anjaaan"
            },
            {
                name: "name3",
                phone: "0987654321",
                relation: "anjaaan"
            }
        ]

        const result = await createRow(empDetails, contacts);
        res.status(200).json({status: 'successful', msg: result});

    }
    catch(err) {
        res.status(500).json({status: 'failed', msg: err});
    }
})

// update an employee
router.patch('/update/:empID', async(req, res) => {
    try{
        const {empID} = req.params
        const {empUpdate, relUpdate} = req.body;
        let relID = undefined;

        // do some computation like how many fiels have been passed..
        if(!(empUpdate || relUpdate))
            return res.status(400).json({"status": "error", "msg": "Atleast 1 field is required.."});
       

        if(relUpdate){
            relID = relUpdate.relID;
            delete relUpdate.relID;
        }

        const result = await updateRow(empID, empUpdate, relID, relUpdate);
        res.status(200).json({status: 'successful', msg: result});

    }
    catch(err) {
        res.status(500).json({status: 'failed', msg: err});
    }
})


// delete an employee..
router.delete('/delete/:id', async(req, res) => {
    try{
        const {id} = req.params

        const result = await deleteRow(id);
        res.status(200).json({status: 'successful', msg: result});
    }
    catch(err) {
        res.status(500).json({status: 'failed', msg: err});
    }
})



module.exports = router;
