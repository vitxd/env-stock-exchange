import conn from './connection';

interface Service {
  id: number;
  name: string;
}

const getServices = () => {
  return conn<Service>('services');
};

const findServiceByName = (name: string) => {
  return conn<Service>('services').where('name', name).first();
};

const storeImage = async (serviceId: number, imageName: string) => {
  await conn('images').insert({
    name: imageName,
    service_id: serviceId,
  });
};

export { type Service, getServices, findServiceByName, storeImage };
