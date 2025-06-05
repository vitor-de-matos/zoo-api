import { CreateQuarentineRecordDTO } from '../dtos/create-quarentine-record.dto';
import { UpdateQuarentineRecordDTO } from '../dtos/update-quarentine-record.dto';
import { FindQuarentineRecordDTO } from '../dtos/find-quarentine-record.dto';
import { QuarantineRecord } from '../entity/quarentine-record.entity';

export interface IQuarentineRecordRepo {
  create(quarentineRecordDTO: CreateQuarentineRecordDTO): Promise<number>;
  find(filters: FindQuarentineRecordDTO): Promise<{
    data: QuarantineRecord[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<QuarantineRecord | undefined>;
  update(
    quarentineRecordId: number,
    quarentineRecordDTO: UpdateQuarentineRecordDTO,
  ): Promise<QuarantineRecord>;
  delete(id: number): Promise<void>;
}
