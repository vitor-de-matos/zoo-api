import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpeciesDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  commonName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  scientificName: string;
}
