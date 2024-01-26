import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
// router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);

// create array of tasks to be used as dummy task data
const tasks = [
    {id: nanoid(), title: "Create back end API for task App", completed: false},
    {id: nanoid(), title: "Create UI for task App", completed: false}
];

// get all tasks saved locally in tasks array
app.get("/tasks", (req, res) => {
    res.send(tasks)
});

// create task
app.post("/tasks", (req, res) => { 
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
app.patch("/tasks/:id", (req, res) => {
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
app.delete("/tasks/:id", (req, res) => {
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

export const handler = serverless(api);