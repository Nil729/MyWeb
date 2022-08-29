import {Router} from 'express';
import * as webmanagerController from '../controller/webmanager.controllers.js';

const router = Router(); 

router.get('/', webmanagerController.getWebmanager);

router.post('/post', webmanagerController.postTask);

router.delete('/delete/:id', webmanagerController.deleteTask);

router.get('/task/:id', webmanagerController.getTask);

router.get('/task/get/:id', webmanagerController.getApp)

router.post('/task/post/:id', webmanagerController.postApp);

router.put('/task/update/:id', webmanagerController.updateApp);

router.delete('/task/delete/:id', webmanagerController.deleteApp);



export default router; 