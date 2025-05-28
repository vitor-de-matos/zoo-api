import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateKeeperDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  shift: string;
}
