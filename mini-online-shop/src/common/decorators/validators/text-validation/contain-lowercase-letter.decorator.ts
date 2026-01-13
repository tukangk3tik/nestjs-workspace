import {
  buildMessage,
  matches,
  ValidateBy,
  ValidationOptions,
} from 'class-validator';

const CONTAIN_LOWERCASE_LETTER_REGEX = /.*[a-z].*/;

const CONTAIN_LOWERCASE_LETTER_KEY = 'containLowercaseLetter';

const isContainLowercaseLetter = (value: string): boolean => {
  return matches(value, CONTAIN_LOWERCASE_LETTER_REGEX);
};

export const ContainLowercaseLetter = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy(
    {
      name: CONTAIN_LOWERCASE_LETTER_KEY,
      validator: {
        validate: (value): boolean => isContainLowercaseLetter(value as string),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property must contain at least one lowercase letter',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
