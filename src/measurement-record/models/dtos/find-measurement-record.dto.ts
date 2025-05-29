import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';

export class FindMeasurementRecordDTO extends PaginationDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  minWeightKg?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maxWeightKg?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  minHeightCm?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maxHeightCm?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  minBodyConditionScore?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maxBodyConditionScore?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  animalId?: number;
}
