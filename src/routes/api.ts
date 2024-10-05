import { Router } from 'express';

import deployment from './deployment';
import environment from './environment';
import service from './service';

const router = Router();

router.use('/service', service);
router.use('/environment', environment);
router.use('/deployment', deployment);

export default router;
