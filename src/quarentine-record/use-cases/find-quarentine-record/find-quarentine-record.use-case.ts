import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { QuarantineRecord } from 'src/quarentine-record/models/entity/quarentine-record.entity';
import { IQuarentineRecordRepo } from 'src/quarentine-record/models/interface/quarentine-repo.interface';

@Injectable()
export class FindQuarentineRecordUseCase {
  constructor(
    @Inject('IQuarentineRecordRepo')
    private readonly quarentineRecordRepository: IQuarentineRecordRepo,
  ) {}

  async find(quarentineRecordId: number): Promise<QuarantineRecord> {
    const quarentineRecord =
      await this.quarentineRecordRepository.findById(quarentineRecordId);
    if (!quarentineRecord) {
      throw new NotFoundException({
        message: 'Registro de quarentena não encontrado',
      });
    }

    return quarentineRecord;
  }
}
