import {
  Environment,
  fetchEnvironments,
  findEnvByName,
  release,
  reserve,
} from '../data';
import EnvironmentAlreadyReservedError from '../exceptions/EnvironmentAlreadyReservedError';
import { isEnvironmentAvailable } from './index';

export const getEnvironments = async () => {
  const data = await fetchEnvironments();

  return data.map((env) => ({
    name: env.name,
    owner: isEnvironmentAvailable(env) ? null : env.owner,
  }));
};

export const releaseEnvironment = async (envName: string) => {
  const env = await findEnvByName(envName);

  if (env === undefined) {
    throw new Error('Environment not found');
  }

  await release(env.id);
};

export const reserveEnvironment = async (env: Environment, owner: string) => {
  if (!isEnvironmentAvailable(env)) {
    throw new EnvironmentAlreadyReservedError({
      environment: env.name,
      owner: env.owner as string,
    });
  }

  await reserve(env.id, owner);
};
