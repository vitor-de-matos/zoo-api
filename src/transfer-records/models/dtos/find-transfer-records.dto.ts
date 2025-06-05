import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';

export class FindTransferRecordsDTO extends PaginationDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fromLocation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  toLocation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  minTransferDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  maxTransferDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  animalId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  keeperId?: number;
}
