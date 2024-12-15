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

    getTasks(table, search) {
        let data = this.#database[table] ?? [];
        if (search) {
            data = data.filter((row) =>  
                Object.entries(search).some(([key, value]) => {
                    if (!value) {return true};
                    return row[key]?.toLowerCase().includes(value.toLowerCase());
                })
            )}
        return data;
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

    markTaskAsCompleted(table, id) {
        const itemId = id.replace('/complete', "");
        const rowIndex = this.#database[table].findIndex((item) => item.id === itemId);
        if (rowIndex > -1) {
            this.#database[table][rowIndex].completed_at = new Date();
            this.#persist();
            return rowIndex;
        }
            return -1;
    }
}