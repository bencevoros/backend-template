import { CommonError } from "./common.error";

export class NotFoundError extends CommonError {
  constructor(message: string) {
    super(message, 404);
  }
}