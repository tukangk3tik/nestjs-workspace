import {
  ArrayNotEmpty,
  ArrayUnique,
  IsOptional,
  Length,
} from 'class-validator';
import { IsCurrency } from '../../../common/decorators/is-currency.decorator';
import { IdDto } from '../../../common/dto/id.dto';
import { IsEntity } from '../../../common/decorators/is-entity.decorator';
import { IdentifierFn } from '../../../common/util/id.util';

export class CreateProductDto {
  @Length(2, 50)
  readonly name: string;

  @IsOptional()
  @Length(1, 500)
  readonly description: string;

  @IsCurrency()
  readonly price: number;

  @ArrayNotEmpty()
  @ArrayUnique(IdentifierFn.ID_DTO)
  @IsEntity()
  readonly categories: IdDto[];
}
