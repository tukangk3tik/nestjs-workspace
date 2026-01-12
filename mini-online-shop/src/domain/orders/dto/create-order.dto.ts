import { ArrayNotEmpty, ArrayUnique, ValidateNested } from 'class-validator';
import { IsEntity } from '../../../common/decorators/is-entity.decorator';
import { IdDto } from '../../../common/dto/id.dto';
import { OrderItemDto } from './order-item.dto';
import { Type } from 'class-transformer';
import { IdentifierFn } from '../../../common/util/id.util';

export class CreateOrderDto {
  @IsEntity()
  readonly customer: IdDto;

  @ArrayNotEmpty()
  @ArrayUnique(IdentifierFn.ORDER_ITEM_DTO)
  @ValidateNested()
  @Type(() => OrderItemDto)
  readonly items: OrderItemDto[];
}
