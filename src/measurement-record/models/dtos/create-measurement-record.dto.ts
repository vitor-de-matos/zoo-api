import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
