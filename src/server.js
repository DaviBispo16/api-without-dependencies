import http from 'node:http';
import { routes } from './routes/tasksRoutes.js';

const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    const router = routes.find((route) => 
        route.method === method && route.url.test(url));
    
    if (router) {
        const routeParam = req.url.match(router.path);
        const idParams = routeParam.input.slice(7);
        req.params = idParams;
        return router.handler(req, res);
    } else {
        console.log("Router not find");
    }
});

const PORT = 3000;
server.listen(PORT, console.log(`Server started on http://localhost:${PORT}`));