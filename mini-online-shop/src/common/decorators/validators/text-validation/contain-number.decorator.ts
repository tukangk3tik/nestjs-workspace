import {
  buildMessage,
  matches,
  ValidateBy,
  ValidationOptions,
} from 'class-validator';

const CONTAIN_NUMBER_REGEX = /.*[0-9].*/;

const CONTAIN_NUMBER_KEY = 'containNumber';

const isContainNumber = (value: string): boolean => {
  return matches(value, CONTAIN_NUMBER_REGEX);
};

export const ContainNumber = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy(
    {
      name: CONTAIN_NUMBER_KEY,
      validator: {
        validate: (value): boolean => isContainNumber(value as string),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property must contain at least one number',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
