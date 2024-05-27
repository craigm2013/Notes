import express from "express";
import cors from "cors";
import {PrismaClient} from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors())

// Our ui will call to get all of our notes, 

// Chosen port of 5000
// curl https://localhost:5000/api/notes to test api
app.get("/api/notes", async(req,res) =>{
    // Prisma to pull data from database
    // .note references the model in table
    // findmany will go to notetable, get all the rows and returning it to the data
    // assigns it to the note variable and passes it as json
    const notes = await prisma.note.findMany();
    res.json(notes);
});

app.post("/api/notes", async(req, res) =>{
    const{title, content} = req.body;

    if(!title || !content){
        return res.status(400).send("title or contents fields empty");
    }

    try{
        const note = await prisma.note.create({
            data: {title,content}
        })
        res.json(note);
    }
    catch(error){
        res.status(500).send("Something went wrong");
    }
});

// Pass in the id of the note we want to update
app.put("/api/notes/:id", async(req,res)=>{
    const {title, content} = req.body;
    const id = parseInt(req.params.id);

    if(!title || !content){
        return res.status(400).send("title or content fields empty")
    }

    // Node value must be a number
    if(!id || isNaN(id)){
        return res.status(400).send("ID must be a valid number");
    }
    try{
        const updatedNote = await prisma.note.update({
            where: {id},
            data:{title,content}
        })
        res.json(updatedNote);
    }
    catch{
        res.status(500).send("Something went wrong");
    }
});

// Submits delete requests to the table
app.delete("/api/notes/:id", async(req, res)=>{
    const id = parseInt(req.params.id);
    
    if(!id || isNaN(id)){
        return res.status(400).send("ID must be a valid number");
    }

    try{
        await prisma.note.delete({
            where: {id}
        });
        res.status(204).send();
    }
    catch{
        res.status(500).send("Something went wrong");
    }
})

app.listen(5000,() =>{
    console.log("server running on localhost:5000");
})