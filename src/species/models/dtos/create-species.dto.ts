import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
