
const express = require("express");
const cors = require('cors')
const Employee = require('./routes/employee');

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// is used to read the requested data from web in FORM .. middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json({limit: "60mb"}));   // allows express to use json in body..
app.use(cors());    // allow cross origin resource sharing..

app.use("/api/employee", Employee);


( async () => {

    try{
        app.listen(PORT, ()=> {
            console.log(`Server is active on port ${PORT}..`);
        })
    }
    catch(err) {
        console.log("Error in server loading");
        console.log(err);
    }

})();


// error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})




