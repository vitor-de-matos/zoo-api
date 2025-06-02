import { Inject, Injectable } from '@nestjs/common';
import { FindQuarentineRecordDTO } from 'src/quarentine-record/models/dtos/find-quarentine-record.dto';
import { QuarantineRecord } from 'src/quarentine-record/models/entity/quarentine-record.entity';
import { IQuarentineRecordRepo } from 'src/quarentine-record/models/interface/quarentine-repo.interface';

@Injectable()
export class FindAllQuarentineRecordUseCase {
  constructor(
    @Inject('IQuarentineRecordRepo')
    private readonly quarentineRepository: IQuarentineRecordRepo,
  ) {}

  async find(quarentineRecordDTO: FindQuarentineRecordDTO): Promise<{
    data: QuarantineRecord[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const quarentineRecord =
      await this.quarentineRepository.find(quarentineRecordDTO);

    return quarentineRecord;
  }
}
