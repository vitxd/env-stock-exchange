import conn from './connection';

interface Environment {
  id: number;
  name: string;
  owner: string | null;
  updated_at: Date;
  created_at: Date;
}

const fetchEnvironments = () => {
  return conn<Environment>('environments');
};

const findEnvByName = (name: string) => {
  return conn<Environment>('environments').where('name', name).first();
};

const reserve = async (envId: number, name: string) => {
  await conn('environments').where('id', envId).update({ owner: name });
};

const release = async (envId: number) => {
  await conn('environments').where('id', envId).update({ owner: null });
};

export { type Environment, fetchEnvironments, findEnvByName, reserve, release };
