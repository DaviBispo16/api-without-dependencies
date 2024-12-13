import fs from 'fs/promises';
import { URL } from 'url';

const databasePath = new URL('./db.json', import.meta.url);

export default class Database {
    #database = {};
    
    constructor() {
        this.#database = {tasks: []};
        fs.readFile(databasePath, "utf-8")
        .then((data) => {
            this.#database = JSON.parse(data)})
        .catch(() => {
            this.#persist();
        })
    }

    #persist() {
        try {
            fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2));
        } catch(error) {
            console.log('Erro ao persistir o banco de dados');
        }
    }

    getTasks(table) {
        const tasks = this.#database[table] ?? [];
        return tasks;
    }

    createTask(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database = [data];
        }
        this.#persist();
        return data;
    }

    updateTask(table, id, data) {
        const rowIndex = this.#database[table].findIndex((item) => item.id === id);
        if (rowIndex > -1) {
            const array = this.#database[table][rowIndex];
            this.#database[table][rowIndex] = {
                id, 
                ...data,
                createdAt: array.createdAt, 
            };
            this.#persist();
            return data;
        }
        return -1;
    }

    removeTask(table, id) {
        const rowIndex = this.#database[table].findIndex((item) => item.id === id);
        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1);
            this.#persist();
            return 0;
        }
        return -1;
    }
}