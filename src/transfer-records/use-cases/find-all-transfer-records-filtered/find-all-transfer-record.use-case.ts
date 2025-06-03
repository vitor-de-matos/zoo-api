import { Inject, Injectable } from '@nestjs/common';
import { FindTransferRecordsDTO } from 'src/transfer-records/models/dtos/find-transfer-records.dto';
import { TransferRecords } from 'src/transfer-records/models/entity/transfer-records.entity';
import { ITransferRecordsRepo } from 'src/transfer-records/models/interface/transfer-records.interface';

@Injectable()
export class FindAllTransferRecordsUseCase {
  constructor(
    @Inject('ITransferRecordsRepo')
    private readonly transferRecordsRepository: ITransferRecordsRepo,
  ) {}

  async find(transferRecordsDTO: FindTransferRecordsDTO): Promise<{
    data: TransferRecords[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const transferRecord =
      await this.transferRecordsRepository.find(transferRecordsDTO);

    return transferRecord;
  }
}
