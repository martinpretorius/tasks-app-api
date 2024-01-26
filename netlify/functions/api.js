import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
// router.get("/hello", (req, res) => res.send("Hello World!"));

// create / route which runs as soon as app starts
router.get("/", (req, res) => {
    res.send("Welcome to my Task API server built with NodeJS and ExpressJS");
})

api.use("/api/", router);

export const handler = serverless(api);