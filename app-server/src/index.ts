import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors())

// Our ui will call to get all of our notes, 

// Chosen port of 5000
app.listen(5000, () => {
    console.log("server running on localhost:5000" )
})

app.get("/api/notes", async(req, res) =>{
    res.json({message:"success!"});
});
