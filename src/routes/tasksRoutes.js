import { randomUUID } from 'node:crypto';
import Database from "../database.js";
import json from '../middlewares/json.js';

const database = new Database();
export const routes = [
    {
        method: "GET",
        url: "/tasks",
        handler: (req, res) => {
            const tasks = database.getTasks('tasks');
            return res.writeHead(200).end(JSON.stringify(tasks));
        },
    },
    {
        method: "POST",
        url: "/tasks",
        handler: async (req, res) => {
            await json(req, res);
            const { title, description } = req.body;
            const createTask = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            console.log(createTask)
            database.createTask('tasks', createTask);
            return res.writeHead(201).end(JSON.stringify(createTask));
        }
    },
    {
        method: "PUT",
        url: '/tasks/'
    }
]

