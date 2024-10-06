import type { DeploymentPayload } from '../validators';
import conn from './connection';

interface Deployment {
  environment_id: number;
  service_id: number;
  deployer: string;
  version: string;
  created_at: Date | null;
  updated_at: Date | null;
}

const storeDeployment = async (
  envId: number,
  serviceId: number,
  data: DeploymentPayload,
) => {
  await conn('deployments')
    .insert({
      environment_id: envId,
      service_id: serviceId,
      deployer: data.deployer,
      version: data.version,
    })
    .onConflict(['environment_id', 'service_id'])
    .merge(['deployer', 'version']);
};

const getDeployments = () => {
  return conn<Deployment>('deployments');
};

const findDeployment = async (
  envName: string,
  serviceName: string,
): Promise<null | Deployment> => {
  return conn<Deployment>('deployments')
    .join('services', 'deployments.service_id', '=', 'services.id')
    .join('environments', 'deployments.environment_id', '=', 'environments.id')
    .where('environments.name', envName)
    .where('services.name', serviceName)
    .first();
};

export { type Deployment, storeDeployment, getDeployments, findDeployment };
