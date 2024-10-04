import express, {type Request, Response} from 'express';
import { EnvironmentValidator } from './validators/enum';
import { Environment } from '../constants';

const router = express.Router();

router.get('/all', (req: Request, res: Response) => {
    const data = Object.keys(Environment).reduce((data: {[key: string]: {[key: string]: string}}, envName) => {
        data[envName] = {
            buildingSafetyCase: '',
            action: '',
            documentVault: '',
            documentGenerator: '',
            riskhub: '',
            admin: '',
            surveyor: '',
            client: '',
        }

        return data;
    }, {})
    
    res.json({data});
});

const envs = Object.keys(Environment);

router.post(`:envName(${envs.join('|')})/:service`, (req: Request, res: Response) => {
    const envName = req.params.envName;
    const service = req.params.service;

    res.json({data: true, envName, service});
});

router.get(`/:envName(${envs.join('|')})/:service`, (req: Request, res: Response) => {
    const envName = req.params.envName;
    const service = req.params.service;

    res.json({data: true, envName, service});
});

export default router;