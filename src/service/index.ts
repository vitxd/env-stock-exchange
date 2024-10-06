import { isAfter, startOfDay } from 'date-fns';

import { Environment } from '../data';

export const splitSlackCommand = (text: string) => text.split(' ');

export const isEnvironmentAvailable = (env: Environment) => {
  const today = startOfDay(new Date());

  return env.owner === null || isAfter(today, env.updated_at);
};
