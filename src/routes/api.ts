import express, {type Request, Response} from 'express';
import { findEnvByName, findServiceByName, getDeployments, getEnvironments, getServices, storeDeployment, type Deployment } from '../data'
import { DeploymentValidator } from './validators';
import { ZodError } from 'zod';

const router = express.Router();

router.get('/services', async (req: Request, res: Response) => {
    const data = await getServices();

    res.json({data: data.map(({name}) => name)})
});

router.get('/environments', async (req: Request, res: Response) => {
    const data = await getEnvironments();

    res.json({data: data.map(({name})=> name)});
});

router.get('/deployments', async (req: Request, res: Response) => {
    const envs = await getEnvironments();
    const services = await getServices();
    const deployments = await getDeployments();
    
    type DeploymentData = Pick<Deployment, "version" | "deployer" | "created_at">

    const findDeploymentFor = (envId: number, serviceId: number) => {
        return deployments.find((el) => el.environment_id === envId && el.service_id === serviceId) || null;
    }

    const data = envs.reduce((envData: {[key: string]: {[key: string]: DeploymentData}}, env) => {
        
        envData[env.name] = services.reduce((serviceData: {[key: string]: DeploymentData}, service) => {
            const dep = findDeploymentFor(env.id, service.id);

            serviceData[service.name] = {
                version: dep?.version || '',
                deployer: dep?.deployer || '',
                created_at: dep?.updated_at || null,
            };

            return serviceData;
        }, {});

        return envData;
    }, {});


    res.json({data});
});

router.post(`/:envName/:service`, async (req: Request, res: Response) => {
    const env = await findEnvByName(req.params.envName);
    const service = await findServiceByName(req.params.service);

    if (env === undefined || service === undefined) {
        res.status(404).json();
        return;
    }

    const data = req.body;
    console.log(data);

    try {
        DeploymentValidator.parse(data);

        storeDeployment(env.id, service.id, data);
    
        res.status(201).json();
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(422).json({
                error: e.errors.map(el => ({field: el.path[0], message: el.message})),
            });
        } else {
            res.status(500).json({})
        }
    }

});

// router.get(`/:envName(${envs.join('|')})/:service`, (req: Request, res: Response) => {
//     const envName = req.params.envName;
//     const service = req.params.service;

//     res.json({data: true, envName, service});
// });

export default router;