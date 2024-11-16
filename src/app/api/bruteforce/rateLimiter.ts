const rateLimitMap = new Map();

export default function rateLimitMiddleware(handler: (req: Request, res: Response) => void) {
    return (req: Request, res: Response) => {
        const ip = req.headers.get("x-forwarded-for");
        const limit = 5;
        const time = 60 * 1000;

        if (!rateLimitMap.has(ip)) {
            rateLimitMap.set(ip, {
                count: 0,
                lastReset: Date.now(),
            });
        }

        const ipData = rateLimitMap.get(ip);

        if (Date.now() - ipData.lastReset > time) {
            ipData.count = 0;
            ipData.lastReset = Date.now();
        }

        if (ipData.count >= limit) {
            return Response.json("Too Many Requests", { status: 429 });
        }

        ipData.count += 1;

        return handler(req, res);
    };
}
