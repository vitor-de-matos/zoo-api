import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsDate,
} from 'class-validator';

export class CreateTransferRecordsDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  fromLocation: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  toLocation: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  transferDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  animalId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  keeperId: number;
}
