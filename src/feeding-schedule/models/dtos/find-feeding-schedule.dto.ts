import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';

export class FindFeedingScheduleDTO extends PaginationDTO {
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
