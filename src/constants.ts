export const Environment = {
  dev01: 'dev01',
  dev02: 'dev02',
  dev03: 'dev03',
  dev04: 'dev04',
  dev05: 'dev05',
  beta: 'beta',
} as const;

export type Environment = (typeof Environment)[keyof typeof Environment];
