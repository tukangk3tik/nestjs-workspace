import {
  buildMessage,
  matches,
  ValidateBy,
  ValidationOptions,
} from 'class-validator';

const CONTAIN_UPPERCASE_LETTER_REGEX = /.*[A-Z].*/;

const CONTAIN_UPPERCASE_LETTER_KEY = 'containUppercaseLetter';

const isContainUppercaseLetter = (value: string): boolean => {
  return matches(value, CONTAIN_UPPERCASE_LETTER_REGEX);
};

export const ContainUppercaseLetter = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy(
    {
      name: CONTAIN_UPPERCASE_LETTER_KEY,
      validator: {
        validate: (value): boolean => isContainUppercaseLetter(value as string),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property must contain at least one uppercase letter',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
