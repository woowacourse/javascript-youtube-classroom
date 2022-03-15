import { VALIDATION_ERROR_NAME } from '../constants/constant';

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = VALIDATION_ERROR_NAME;
  }
}

export default ValidationError;
