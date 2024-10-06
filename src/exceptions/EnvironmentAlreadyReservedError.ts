export default class EnvironmentAlreadyReservedError extends Error {
  environment: string;
  owner: string;

  constructor({ environment, owner }: { environment: string; owner: string }) {
    super();
    this.environment = environment;
    this.owner = owner;
  }
}
