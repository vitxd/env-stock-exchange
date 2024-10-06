import express, { type Request, Response } from 'express';
import { ZodError } from 'zod';

import {
  type Deployment,
  fetchEnvironments,
  findDeployment,
  findEnvByName,
  findServiceByName,
  getDeployments,
  getServices,
  storeDeployment,
} from '../data';
import ResourceNotFoundError from '../exceptions/ResourceNotFoundError';
import { DeploymentValidator } from '../validators';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const envs = await fetchEnvironments();
  const services = await getServices();
  const deployments = await getDeployments();

  type DeploymentData = Pick<Deployment, 'version' | 'deployer' | 'created_at'>;

  const findDeploymentFor = (envId: number, serviceId: number) => {
    return (
      deployments.find(
        (el) => el.environment_id === envId && el.service_id === serviceId,
      ) || null
    );
  };

  const data = envs.reduce(
    (envData: { [key: string]: { [key: string]: DeploymentData } }, env) => {
      envData[env.name] = services.reduce(
        (serviceData: { [key: string]: DeploymentData }, service) => {
          const dep = findDeploymentFor(env.id, service.id);

          serviceData[service.name] = {
            version: dep?.version || '',
            deployer: dep?.deployer || '',
            created_at: dep?.updated_at || null,
          };

          return serviceData;
        },
        {},
      );

      return envData;
    },
    {},
  );

  res.json({ data });
});

router.post(`/:envName/:service`, async (req: Request, res: Response) => {
  const env = await findEnvByName(req.params.envName);
  const service = await findServiceByName(req.params.service);

  if (env === undefined || service === undefined) {
    throw new ResourceNotFoundError();
  }

  const data = req.body;

  DeploymentValidator.parse(data);

  storeDeployment(env.id, service.id, data);

  res.status(201).json();
});

router.get(`/:envName/:service`, async (req: Request, res: Response) => {
  const envName = req.params.envName;
  const service = req.params.service;

  const deployment = await findDeployment(envName, service);

  res.json({ data: deployment });
});

export default router;
