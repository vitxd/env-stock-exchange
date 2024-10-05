import conn from './connection';
import type { DeploymentPayload } from '../routes/validators';

interface Deployment {
    environment_id: number
    service_id: number
    deployer: string
    version: string
    created_at: Date | null
    updated_at: Date | null
}

const storeDeployment = async (envId: number, serviceId: number, data: DeploymentPayload) => {
    await conn('deployments')
    .insert({
        environment_id: envId,
        service_id: serviceId,
        deployer: data.deployer,
        version: data.version,
    })
    .onConflict(['environment_id', 'service_id'])
    .merge(['deployer', 'version'])
}

const getDeployments = () => {
    return conn<Deployment>('deployments');
}

export {
    type Deployment,
    storeDeployment,
    getDeployments,
}