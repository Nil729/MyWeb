import {Router} from 'express';
import * as sessionsControllers from '../controller/session.controllers.js';

const router = Router(); 

router.post('/', sessionsControllers.login);
router.post('/signup', sessionsControllers.singup);

export default router;