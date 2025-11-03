export default function errorHandler(err, req, res, next) {
console.error(err);
const status = err.status || 500;
if (req.accepts('html')) {
return res.status(status).render('index', { title: 'Error', message: err.message || 'Server error' });
}
return res.status(status).json({ error: err.message || 'Server error' });
}