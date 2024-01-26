import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
// router.get("/hello", (req, res) => res.send("Hello World!"));

// create array of tasks to be used as dummy task data
const tasks = [
    {id: nanoid(), title: "Create back end API for task App", completed: false},
    {id: nanoid(), title: "Create UI for task App", completed: false}
];

// create / route which runs as soon as app starts
router.get("/", (req, res) => {
    res.send("Welcome to my Task API server built with NodeJS and ExpressJS");
});

// get all tasks saved locally in tasks array
router.get("/tasks", (req, res) => {
    res.send(tasks)
});

api.use("/api/", router);

export const handler = serverless(api);