import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMedicalRecordDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  diagnosis: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  treatment: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  medication?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  animalId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  quarentineId?: number;
}
