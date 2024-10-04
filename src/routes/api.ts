import express, {type Request, Response} from 'express';
import { getDeployments, getEnvironments, getServices, type Deployment } from '../data'

const router = express.Router();

router.get('/services', async (req: Request, res: Response) => {
    const data = await getServices();

    res.json({data: data.map(({name}) => name)})
});

router.get('/environments', async (req: Request, res: Response) => {
    const data = await getEnvironments();

    res.json({data: data.map(({name})=> name)});
});

router.get('/all', async (req: Request, res: Response) => {
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

// router.post(`:envName/:service`, (req: Request, res: Response) => {
//     const envName = req.params.envName;
//     const service = req.params.service;

//     res.json({data: true, envName, service});
// });

// router.get(`/:envName(${envs.join('|')})/:service`, (req: Request, res: Response) => {
//     const envName = req.params.envName;
//     const service = req.params.service;

//     res.json({data: true, envName, service});
// });

export default router;