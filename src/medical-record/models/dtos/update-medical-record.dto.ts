import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMedicalRecordDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  date?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  diagnosis?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  treatment?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  medication?: string;

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
  quarentineId?: number;
}
