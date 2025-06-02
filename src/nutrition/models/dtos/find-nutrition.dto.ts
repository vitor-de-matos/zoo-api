import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  IsJSON,
} from 'class-validator';

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
