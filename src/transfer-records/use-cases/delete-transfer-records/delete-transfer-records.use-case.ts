import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITransferRecordsRepo } from 'src/transfer-records/models/interface/transfer-records.interface';

@Injectable()
export class DeleteTransferRecordsUseCase {
  constructor(
    @Inject('ITransferRecordsRepo')
    private readonly transferRecordsRepository: ITransferRecordsRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const transferRecords = await this.transferRecordsRepository.findById(id);

    if (!transferRecords) {
      throw new NotFoundException({
        message: 'Registro de transferencia não encontrado',
      });
    }

    await this.transferRecordsRepository.delete(id);
  }
}
