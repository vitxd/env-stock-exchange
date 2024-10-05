import conn from './connection';

interface Environment {
  id: number;
  name: string;
  owner: string | null;
  updated_at: Date;
  created_at: Date;
}

const getEnvironments = () => {
  return conn<Environment>('environments');
};

const findEnvByName = (name: string) => {
  return conn<Environment>('environments').where('name', name).first();
};

const reserve = async (envId: number, name: string) => {
  console.log(name);
  await conn('environments').where('id', envId).update({ owner: name });
};

export { type Environment, getEnvironments, findEnvByName, reserve };
