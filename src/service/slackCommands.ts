import { findEnvByName } from '../data';
import {
  getEnvironments,
  releaseEnvironment,
  reserveEnvironment,
} from './environments';

const reserveCommand = async (environment: string, userName: string) => {
  const env = await findEnvByName(environment);

  if (env === undefined) {
    throw Error('Cannot find environment');
  }

  await reserveEnvironment(env, userName);

  return `Environment reserved for ${userName}`;
};

const listCommand = async () => {
  const envs = await getEnvironments();

  return (
    'List of environments:\n' +
    envs.map((env) => `${env.name}: ${env.owner || 'Available'}`).join('\n')
  );
};

const releaseCommand = async (environment: string) => {
  const env = await findEnvByName(environment);

  if (env === undefined) {
    throw Error('Cannot find environment');
  }

  await releaseEnvironment(env.name);

  return `Environment ${environment} released`;
};

export const commandResolver = (command: string[], userName: string) => {
  switch (command[0] || '') {
    case 'list':
      console.log('list command');
      return listCommand();
    case 'reserve':
      console.log('reserve');
      return reserveCommand(command[1], userName);
    case 'release':
      console.log('release');
      return releaseCommand(command[1]);
    default:
      console.log('unknown command');
      throw Error(
        'Invalid command. Available commands are: list, reserve and release',
      );
  }
};
