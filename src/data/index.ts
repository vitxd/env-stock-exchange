import conn from './connection';

export interface Environment {
    id: number
    name: string
};

export interface Service {
    id: number
    name: string
};

export interface Deployment {
    environment_id: number
    service_id: number
    deployer: string
    version: string
    created_at: Date | null
    updated_at: Date | null
}

const getEnvironments = () => {
    return conn<Environment>('environments');
};

const getServices = () => {
    return conn<Service>('services');
}

const getDeployments = () => {
    return conn<Deployment>('deployments');
}


export {
    getEnvironments,
    getServices,
    getDeployments,
}