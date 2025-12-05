import exppress from 'express'
import {activateBusinessAdmin,activationBusinessRequest} from '../controllers/business.controller.js'
import userAuthMiddleware from '../middlewares/user.middleware.js';
import { roleAuthMiddleware } from '../middlewares/roleAuth.middleware.js';
const router=exppress.Router();

router.post('/business-activation-request',
    userAuthMiddleware,
    roleAuthMiddleware("Business"),
    activationBusinessRequest
);
router.post('/activate-business',
    userAuthMiddleware,
    roleAuthMiddleware("Admin"),
    activateBusinessAdmin
);



export default router;