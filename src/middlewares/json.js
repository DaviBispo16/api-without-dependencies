export default async function json(req, res) {
    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
        if (!req.body) {
            return res.writeHead(400, { 'Content-Type': 'application/json' })
                .end(JSON.stringify({ error: "Body is empty or malformed" }));
        }

        const requiredFields = ['title', 'description'];
        for (const field of requiredFields) {
            if (!(field in req.body)) {
                return res.writeHead(400, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ error: `Field ${field} required missing from requisition` }))
            }
        }
    } catch (error) {
        req.body = null;
        return res.writeHead(400, { 'Content-Type': 'application/json' })
            .end(JSON.stringify({ error: "Body of requisition is invalid" }))
    }
    res.setHeader('Content-Type', 'application/json');
}