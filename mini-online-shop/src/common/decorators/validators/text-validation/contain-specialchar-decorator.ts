import {
  buildMessage,
  matches,
  ValidateBy,
  ValidationOptions,
} from 'class-validator';

const CONTAIN_SPECIALCHAR_REGEX = /.*[!@#$%^&*(),.?":{}|<>].*/;

const CONTAIN_SPECIALCHAR_KEY = 'containSpecialChar';

const isContainSpecialChar = (value: string): boolean => {
  return matches(value, CONTAIN_SPECIALCHAR_REGEX);
};

export const ContainSpecialChar = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy(
    {
      name: CONTAIN_SPECIALCHAR_KEY,
      validator: {
        validate: (value): boolean => isContainSpecialChar(value as string),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix +
            '$property must contain at least one special character',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
