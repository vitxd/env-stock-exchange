import express, {type Request, Response} from 'express';
import { EnvironmentValidator } from './validators/enum';
import { Environment } from '../constants';
const router = express.Router();

router.get(':envName', (req: Request, res: Response) => {
    res.json({data: []});
});

const envs = Object.keys(Environment);

router.post(`:envName(${envs.join('|')})/:service`, (req: Request, res: Response) => {
    const envName = req.params.envName;
    const service = req.params.service;

    res.json({data: true, envName, service});
});

export default router;