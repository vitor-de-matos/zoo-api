import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsNumber,
  IsString,
  IsArray,
  IsJSON,
} from 'class-validator';

export class UpdateNutritionDTO {
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
  dailyCalories?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  feedingMethod?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  animalId?: number;
}
