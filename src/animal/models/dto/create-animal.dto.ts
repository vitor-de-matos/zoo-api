import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateAnimalDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  idSpecies: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  idHabitat: number;
}
