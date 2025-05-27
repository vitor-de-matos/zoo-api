import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

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
