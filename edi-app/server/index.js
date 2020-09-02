const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
app.use(cors());
app.use(express.json());


//ROUTES
//create a edi
app.post("/edi", async (req, res)=>{
    //await
    try {
        const {name, description, context_path, service, direction, username, password} = req.body;
        const newEdi = await pool.query("INSERT INTO ediapp (name, description, context_path, service, direction, username, password) VALUES($1,$2,$3,$4,$5, $6, $7) RETURNING *", [name,description,context_path,service,direction, username, password]);
        res.json(newEdi);
    } catch (err) {
        console.error(err.message);
        
    }
})


//get all edis
app.get("/edi", async (req, res)=>{
    //await
    try {
        const allEdis = await pool.query("SELECT * FROM ediapp");

        res.json(allEdis.rows);
    } catch (err) {
        console.error(err.message);
        
    }
})

//get a edi
app.get("/edi/:id", async (req, res)=>{
    //await
    try {
        const {id} = req.params;

        const edi = await pool.query("SELECT * FROM ediapp WHERE edi_id = $1",[id]);
        res.json(edi.rows);
    } catch (err) {
        console.error(err.message);
        
    }
})

//update a edi
app.put("/edi/:id", async (req, res)=>{
    //await
    try {
        const {id} = req.params;
        const {name, description, context_path, service, direction, username, password} = req.body;
        const updateEdi = await pool.query("UPDATE ediapp SET name=$1, description=$2, context_path=$3, service=$4, direction=$5, username=$6, password=$7 WHERE edi_id = $8", [name, description, context_path, service, direction, username, password, id])

        res.json("EDI was updated")
    } catch (err) {
        console.error(err.message);

    }
})

//delete a edi
app.delete("/edi/:id", async (req, res)=>{
    //await
    try {
        const {id} = req.params;
        const deleteEdi = await pool.query("DELETE from ediapp WHERE edi_id = $1", [id])

        res.json("Edi was deleted")
    } catch (err) {
        console.error(err.message);

    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000");
})