import { getServices } from '../data';

export const listServices = async () => {
  const data = await getServices();

  return data.map(({ name }) => name);
};
