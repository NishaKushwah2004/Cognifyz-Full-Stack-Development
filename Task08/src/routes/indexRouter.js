import express from 'express';
import { home } from '../controllers/homeController.js';
import { enqueueEmail } from '../jobs/emailJobProducer.js';


const router = express.Router();


router.get('/', home);


// demo route to add a background job
router.post('/send-welcome', async (req, res, next) => {
try {
const { email, name } = req.body;
await enqueueEmail({ email, name });
res.json({ ok: true, message: 'Email job enqueued' });
} catch (err) {
next(err);
}
});


export default router;