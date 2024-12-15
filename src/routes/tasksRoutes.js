import { randomUUID } from "node:crypto";
import Database from "../database.js";
import json from "../middlewares/json.js";
import buildRoutePath from "../utils/buildRoutePath.js";

const database = new Database();
export const routes = [
    {
        method: "GET",
        url: buildRoutePath("/tasks"),
        handler: (req, res) => {
            const { title, description } = req.query;
            const search = {};
            if (title) search.title = title;
            if (description) search.description = description;
            const tasks = database.getTasks('tasks', Object.keys(search).length > 0 ? search : null);
            return res.writeHead(200).end(JSON.stringify(tasks));
        },
    },
    {
        method: "POST",
        url: buildRoutePath("/tasks"),
        handler: async (req, res) => {
            const response = await json(req, res);
            if (response == undefined) {
                const { title, description } = req.body;
                const createTask = {
                    id: randomUUID(),
                    title,
                    description,
                    completed_at: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
                database.createTask('tasks', createTask);
                return res.writeHead(201).end(JSON.stringify(createTask));
            }
        }
    },
    {
        method: "PUT",
        url: buildRoutePath('/tasks/:id'),
        handler: async (req, res) => {
            const response = await json(req, res);
            if (response == undefined) {
                const { title, description } = req.body;
                const newTask = {
                    title,
                    description,
                    completed_at: null,
                    updatedAt: new Date()
                }
                const changeTask = database.updateTask('tasks', req.params, newTask);
                if (changeTask == -1) {
                    return res.writeHead(400).end(JSON.stringify({ error: `ID ${req.params} not found` }));
                }
                return res.writeHead(201).end(JSON.stringify(changeTask));
            }
        }
    },
    {
        method: "DELETE",
        url: buildRoutePath("/tasks/:id"),
        handler: async (req, res) => {
            const deleteTask = database.removeTask("tasks", req.params);
            if (deleteTask === -1) {
                return res.writeHead(400).end(JSON.stringify({ error: `ID ${req.params} not found` }));
            }
            return res.writeHead(204).end();
        }
    },
    {
        method: "PATCH",
        url: buildRoutePath("/tasks/:id/complete"),
        handler: (req, res) => {
            const markTaskCompleted = database.markTaskAsCompleted("tasks", req.params);
            if (markTaskCompleted === -1) {
                return res.writeHead(400).end(JSON.stringify({ error: `ID ${req.params} not found` }));
            }

            return res.writeHead(200).end(JSON.stringify({ message: "Attribute updated successfully" }));
        }
    }
]

