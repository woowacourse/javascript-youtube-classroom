import { ERROR_MESSAGES, QUERY_STRING } from '../config/constants';
import { grouper } from './commons.js';

export const validate = (target, validator) => {
  const { subject, rules } = validator;

  grouper(
    (logger) => {
      rules.every(({ description, test, errorMessage }) => {
        const result = test(target);

        logger(subject, description, result ? '✓' : '✗');

        if (!result) throw new Error(errorMessage);

        return true;
      });
    },
    subject,
    true
  );
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
