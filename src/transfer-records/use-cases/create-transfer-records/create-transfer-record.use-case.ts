import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateTransferRecordsDTO } from 'src/transfer-records/models/dtos/create-transfer-records.dto';
import { ITransferRecordsRepo } from 'src/transfer-records/models/interface/transfer-records.interface';

@Injectable()
export class CreateTransferRecordsUseCase {
  constructor(
    @Inject('ITransferRecordsRepo')
    private readonly transferRecordsRepository: ITransferRecordsRepo,
  ) {}

  async create(transferRecordsDTO: CreateTransferRecordsDTO): Promise<number> {
    const transferRecordsCreated =
      await this.transferRecordsRepository.create(transferRecordsDTO);

    if (isNaN(transferRecordsCreated)) {
      throw new BadRequestException({
        message: 'Resposta inválida. Entre em contato com o suporte.',
      });
    }
    return transferRecordsCreated;
  }
}
