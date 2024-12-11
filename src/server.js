import http from 'node:http';
import { routes } from './routes/tasksRoutes.js';

const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    const router = routes.find((item) => {
        return item.method === method && item.url === url;
    });
    if (router) {
        return router.handler(req, res);
    } else {
        console.log("Router not find");
    }
});

const PORT = 3000;
server.listen(PORT, console.log(`Server started on http://localhost:${PORT}`));