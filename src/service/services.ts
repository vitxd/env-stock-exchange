import { findServiceByName, getServices, storeImage } from '../data';

export const listServices = async () => {
  const data = await getServices();

  return data.map(({ name }) => name);
};

export const createImage = async (serviceName: string, imageName: string) => {
  const service = await findServiceByName(serviceName);

  if (service === undefined) {
    throw new Error(`Service ${serviceName} not found`);
  }

  await storeImage(service.id, imageName);
};
