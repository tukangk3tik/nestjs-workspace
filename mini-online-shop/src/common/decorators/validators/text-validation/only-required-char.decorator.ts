import {
  buildMessage,
  matches,
  ValidateBy,
  ValidationOptions,
} from 'class-validator';

const ONLY_REQUIRED_CHAR_REGEX = /^[a-zA-Z\d@$!%*?&]+$/;

const ONLY_REQUIRED_CHAR_KEY = 'onlyRequiredChar';

const isOnlyRequiredChar = (value: string): boolean => {
  return matches(value, ONLY_REQUIRED_CHAR_REGEX);
};

export const OnlyRequiredChar = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy(
    {
      name: ONLY_REQUIRED_CHAR_KEY,
      validator: {
        validate: (value): boolean => isOnlyRequiredChar(value as string),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix +
            '$property must contain only letters, numbers and the following special characters: @$!%*?&',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
