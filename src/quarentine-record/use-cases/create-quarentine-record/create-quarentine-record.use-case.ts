import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateQuarentineRecordDTO } from 'src/quarentine-record/models/dtos/create-quarentine-record.dto';
import { IQuarentineRecordRepo } from 'src/quarentine-record/models/interface/quarentine-repo.interface';

@Injectable()
export class CreateQuarentineRecordUseCase {
  constructor(
    @Inject('IQuarentineRecordRepo')
    private readonly quarentineRecordRepository: IQuarentineRecordRepo,
  ) {}

  async create(
    quarentineRecordDTO: CreateQuarentineRecordDTO,
  ): Promise<number> {
    const quarentineRecordCreated =
      await this.quarentineRecordRepository.create(quarentineRecordDTO);

    if (isNaN(quarentineRecordCreated)) {
      throw new BadRequestException({
        message: 'Resposta inválida. Entre em contato com o suporte.',
      });
    }
    return quarentineRecordCreated;
  }
}
