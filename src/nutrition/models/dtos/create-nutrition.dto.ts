import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsJSON,
} from 'class-validator';

export class CreateNutritionDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  dietType: string;

  @ApiProperty({ required: true, type: [String] })
  @IsNotEmpty()
  @IsArray()
  @IsJSON()
  foodItems: string[];

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  dailyCalories: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  feedingMethod: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  animalId: number;
}
