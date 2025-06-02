import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
} from 'class-validator';

export class CreateFeedingScheduleDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  time: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  idSpecies: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  idNutrition: number;
}
