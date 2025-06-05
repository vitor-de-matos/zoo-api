import { CreateTransferRecordsDTO } from '../dtos/create-transfer-records.dto';
import { UpdateTransferRecordsDTO } from '../dtos/update-transfer-records.dto';
import { FindTransferRecordsDTO } from '../dtos/find-transfer-records.dto';
import { TransferRecords } from '../entity/transfer-records.entity';

export interface ITransferRecordsRepo {
  create(transferRecordsDTO: CreateTransferRecordsDTO): Promise<number>;
  find(filters: FindTransferRecordsDTO): Promise<{
    data: TransferRecords[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<TransferRecords | undefined>;
  update(
    transferRecordsId: number,
    transferRecordsDTO: UpdateTransferRecordsDTO,
  ): Promise<TransferRecords>;
  delete(id: number): Promise<void>;
}
