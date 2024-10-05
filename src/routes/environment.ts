import express, {type Request, Response} from 'express';
import { findEnvByName, getEnvironments, reserve } from '../data';
import { ReserveValidator } from './validators';
import { ZodError } from 'zod';
import { isEnvironmentAvailable } from '../service';

const router = express.Router();



router.get('/', async (req: Request, res: Response) => {
    const data = await getEnvironments();

    res.json({data: data.map(({name})=> name)});
});

router.get('/:envName', (req: Request, res: Response) => {
    
})

router.post('/reserve/:envName', async (req: Request, res: Response) => {
    const envName = req.params.envName;
    const env = await findEnvByName(envName);
    
    if (env === undefined) {
        res.status(404).json();
        return;
    }

    const data = req.body
    try {
        ReserveValidator.parse(data);

        if (!isEnvironmentAvailable(env)) {
            res.status(409).json();
            return;
        }

        reserve(env.id, data.name);
        res.status(201).json();
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(422).json({
                error: e.errors.map(el => ({field: el.path[0], message: el.message})),
            });
        } else {
            res.status(500).json();
        }
    }


});

export default router;