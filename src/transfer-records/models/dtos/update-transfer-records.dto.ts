import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTransferRecordsDTO {
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
  transferDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  animalId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  keeperId?: number;
}
