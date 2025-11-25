import { 
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from "class-validator";
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  make?: string;

  @IsString()
  model?: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(1930)
  @Max(new Date().getFullYear())
  year?: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  longitude?: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  latitude?: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage?: number;
}