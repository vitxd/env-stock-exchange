import z from 'zod';

export const DeploymentValidator = z.object({
    version: z.string(),
    deployer: z.string(),
});

export type DeploymentPayload = z.infer<typeof DeploymentValidator>;

export const ReserveValidator = z.object({
    name: z.string(),
});