import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITransferRecordsRepo } from 'src/transfer-records/models/interface/transfer-records.interface';
import { TransferRecords } from 'src/transfer-records/models/entity/transfer-records.entity';

@Injectable()
export class FindTransferRecordsUseCase {
  constructor(
    @Inject('ITransferRecordsRepo')
    private readonly specieRepository: ITransferRecordsRepo,
  ) {}

  async find(transferRecordId: number): Promise<TransferRecords> {
    const transferRecord =
      await this.specieRepository.findById(transferRecordId);
    if (!transferRecord) {
      throw new NotFoundException({
        message: 'Registro de transferencia não encontrado',
      });
    }

    return transferRecord;
  }
}
