import { HttpException } from '.';

export default class ResourceNotFoundError extends HttpException {
  constructor() {
    super(404, '');
  }
}
