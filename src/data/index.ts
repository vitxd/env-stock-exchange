import { Environment, type Environment as EnvironmentType } from "../constants";

export { default as ORM } from './orm';

// const data: {[key: keyof EnvironmentType]: object} = Object.keys(Environment).reduce((res, el: string) => {
//     res[el] = {};

//     return res;
// });

const getEnvironment = (envName: keyof Environment): null|string => {
    return 'something';
}


export {
    getEnvironment
}