import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFeedingScheduleDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  time?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  idSpecies?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  idNutrition?: number;
}
