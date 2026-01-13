import { applyDecorators } from '@nestjs/common';
import { Length, ValidationOptions } from 'class-validator';
import { ContainSpecialChar } from './text-validation/contain-specialchar-decorator';
import { ContainUppercaseLetter } from './text-validation/contain-uppercase-letter.decorator';
import { OnlyRequiredChar } from './text-validation/only-required-char.decorator';
import { ContainNumber } from './text-validation/contain-number.decorator';
import { ContainLowercaseLetter } from './text-validation/contain-lowercase-letter.decorator';

/**
 * Checks if the value is a string following these rules:
 * 1. 8 to 20 characters
 * 2. At least one
 * - Lowercase letter
 * - Uppercase letter
 * - Number
 * - Special character
 */
export const IsPassword = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  applyDecorators(
    ContainLowercaseLetter(validationOptions),
    ContainUppercaseLetter(validationOptions),
    ContainSpecialChar(validationOptions),
    ContainNumber(validationOptions),
    OnlyRequiredChar(validationOptions),
    Length(8, 20, validationOptions),
  );
