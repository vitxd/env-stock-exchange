import z from 'zod';

export const DeploymentValidator = z.object({
    version: z.string(),
    deployer: z.string(),
});

export type DeploymentPayload = z.infer<typeof DeploymentValidator>;