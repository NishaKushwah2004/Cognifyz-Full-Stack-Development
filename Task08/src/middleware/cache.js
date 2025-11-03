import redis from '../config/redis.js';


// ttlSeconds: cache duration for this route (in seconds)
export default function cacheMiddleware(ttlSeconds = 10) {
return async function (req, res, next) {
try {
const key = `cache:${req.originalUrl}`;
const cached = await redis.get(key);
if (cached) {
// cached string; we assume the handler uses res.json or res.render
const parsed = JSON.parse(cached);
// If it's a rendered page, send HTML string
if (parsed.type === 'html') {
res.set('X-Cache', 'HIT');
return res.send(parsed.payload);
}
res.set('X-Cache', 'HIT');
return res.json(parsed.payload);
}


// wrap res.send and res.json to capture output
const originalSend = res.send.bind(res);
res.send = (body) => {
// only cache successful GET responses
if (req.method === 'GET' && res.statusCode === 200) {
const toStore = {
type: 'html',
payload: body,
};
redis.setex(key, ttlSeconds, JSON.stringify(toStore)).catch(console.error);
}
res.set('X-Cache', 'MISS');
return originalSend(body);
};


// For JSON responses
const originalJson = res.json.bind(res);
res.json = (obj) => {
if (req.method === 'GET' && res.statusCode === 200) {
const toStore = {
type: 'json',
payload: obj,
};
redis.setex(key, ttlSeconds, JSON.stringify(toStore)).catch(console.error);
}
res.set('X-Cache', 'MISS');
return originalJson(obj);
};


next();
} catch (err) {
console.error('Cache middleware error', err);
next();
}
};
}