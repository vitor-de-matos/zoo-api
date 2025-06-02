import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
} from 'class-validator';

export class CreateQuarentineRecordDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  reason: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  animalId: number;
}
