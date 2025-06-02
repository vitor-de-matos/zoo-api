import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMeasurementRecordDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  weightKg: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  heightCm: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  bodyConditionScore: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  animalId: number;
}
