import z from 'zod';
import { Environment } from '../../constants';

export const EnvironmentValidator = z.nativeEnum(Environment);