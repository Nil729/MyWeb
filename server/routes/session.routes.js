import {Router} from 'express';
import * as sessionsControllers from '../controller/session.controllers.js';

const router = Router(); 

router.get('/login', sessionsControllers.login);
router.post('/signup', sessionsControllers.singup);

export default router;