import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
