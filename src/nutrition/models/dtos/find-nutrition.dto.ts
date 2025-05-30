import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';

export class FindNutritionRecordDTO extends PaginationDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  dietType?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsJSON()
  foodItems?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  minDailyCalories?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maxDailyCalories?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  feedingMethod?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  animalId?: number;
}
