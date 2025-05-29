import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';

export class FindMedicalRecordDTO extends PaginationDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  diagnosis?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  animalId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  quarentineId?: number;
}
