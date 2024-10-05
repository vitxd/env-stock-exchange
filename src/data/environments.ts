import conn from './connection';

interface Environment {
    id: number
    name: string
};

const getEnvironments = () => {
    return conn<Environment>('environments');
};

const findEnvByName = (name: string) => {
    return conn<Environment>('environments').where('name', name).first();
}

export {
    type Environment,
    getEnvironments,
    findEnvByName,
}