import {
  IsBoolean as DefaultIsBoolean,
  ValidationOptions,
} from 'class-validator';
import { ToBoolean } from '../transformers/to-boolean.decorator';
import { applyDecorators } from '@nestjs/common/decorators';

/*
 * Checks if the value is a boolean. Works with query params too
 */
export const IsBoolean = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  applyDecorators(DefaultIsBoolean(validationOptions), ToBoolean());
