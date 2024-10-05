import { Environment } from "../data";
import { isAfter, startOfDay } from 'date-fns';

export const isEnvironmentAvailable = (env: Environment) => {
    const today = startOfDay(new Date());

    return env.owner === null || isAfter(today, env.updated_at);
}