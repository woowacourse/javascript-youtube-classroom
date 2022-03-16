import { ERROR_MESSAGES, QUERY_STRING } from '../config/constants';
import { logger } from './commons.js';

export const validate = (target, validator) => {
  const { subject, rules } = validator;

  rules.every(({ description, test, errorMessage }) => {
    const doTest = () => {
      if (!test(target)) throw new Error(errorMessage);

      return true;
    };

    return process.env.NODE_ENV === 'development'
      ? logger(doTest, subject, description, test(target) ? '✓' : '✗')
      : doTest();
  });
};

export const queryStringValidator = {
  subject: 'query string',
  rules: [
    {
      description: 'should not be empty.',
      test: (value) => value.length > 0,
      errorMessage: ERROR_MESSAGES.QUERY_STRING.EMPTY,
    },
    {
      description: 'should not be too long.',
      test: (value) => value.length <= QUERY_STRING.LENGTH.MAX,
      errorMessage: ERROR_MESSAGES.QUERY_STRING.TOO_LONG,
    },
  ],
};
