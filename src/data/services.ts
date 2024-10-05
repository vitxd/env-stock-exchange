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

export { type Service, getServices, findServiceByName };
