import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";

const app = express();
app.use(express.json());
app.use(cors());

// set up basic express server running on port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// create / route which runs as soon as app starts
app.get("/", (request, response) => {
    response.send("Welcome to my Task API server built with NodeJS and ExpressJS");
})

// create array of tasks to be used as dummy task data
const tasks = [
    {id: nanoid(), title: "Create back end API for task App", completed: false},
    {id: nanoid(), title: "Create UI for task App", completed: false}
];

// get all tasks saved locally in tasks array
app.get("/api/tasks", (req, res) => {
    res.send(tasks)
});

// create task
app.post("/api/tasks", (req, res) => { 
    const { title } = req.body;

    if (!title) {
        return res.status(400).send("Title field is required!");
    }
    
    try {
        const task = {
            id: nanoid(),
            title: req.body.title,
            content: req.body.content,
            completed: false
        };

        tasks.push(task);
        res.json(task);
    } catch (error) {
        res.status(500).send("Oops, something went wrong");
    }
});

// update task
app.patch("/api/tasks/:id", (req, res) => {
    const { title } = req.body;
    const id = req.params.id;
    const task = tasks.find((task) => task.id === req.params.id);

    if (!title) {
        return res.status(400).send("Title field is required!");
    }
    
    if (!id) {
        return res.status(400).send("Please provid a task ID!");
    }
    
    if (!task) {
        return res.status(404).send("Task not found!");
    }

    try {
        task.title = title;          
        task.completed = req.body.completed;
        res.json(task);
    } catch (error) {
        res.status(500).send("Oops, something went wrong");
    }   
})

// delete task
app.delete("/api/tasks/:id", (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send("Please provid a task ID!");
    }

    const task = tasks.find((task) => task.id === req.params.id);
    if (!task) {
        return res.status(404).send("Task not found!");
    }

    try {
        const index = tasks.indexOf(task);
        tasks.splice(index, 1);
        res.status(204).send();
    } catch (error) {
        res.status(500).send("Oops, something went wrong");
    }
})

