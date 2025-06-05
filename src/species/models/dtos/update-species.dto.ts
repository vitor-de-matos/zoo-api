import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSpeciesDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  commonName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  scientificName?: string;
}
