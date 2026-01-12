import {
  ArrayNotEmpty,
  ArrayUnique,
  IsOptional,
  Length,
} from 'class-validator';
import { IsCurrency } from '../../../common/decorators/is-currency.decorator';
import { IdDto } from '../../../common/dto/id.dto';
import { IsEntity } from '../../../common/decorators/is-entity.decorator';
import { idDtoIdentifier } from '../../../common/util/id.util';

export class CreateProductDto {
  @Length(2, 50)
  readonly name: string;

  @IsOptional()
  @Length(1, 500)
  readonly description: string;

  @IsCurrency()
  readonly price: number;

  @ArrayNotEmpty()
  @ArrayUnique(idDtoIdentifier)
  @IsEntity()
  readonly categories: IdDto[];
}
