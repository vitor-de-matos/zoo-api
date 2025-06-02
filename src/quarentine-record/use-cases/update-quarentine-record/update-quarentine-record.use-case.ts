import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateQuarentineRecordDTO } from 'src/quarentine-record/models/dtos/update-quarentine-record.dto';
import { QuarantineRecord } from 'src/quarentine-record/models/entity/quarentine-record.entity';
import { IQuarentineRecordRepo } from 'src/quarentine-record/models/interface/quarentine-repo.interface';

@Injectable()
export class UpdateQuarentineRecordUseCase {
  constructor(
    @Inject('IQuarentineRecordRepo')
    private readonly quarentineRecordRepository: IQuarentineRecordRepo,
  ) {}

  async update(
    quarentineRecordId: number,
    quarentineRecordDTO: UpdateQuarentineRecordDTO,
  ): Promise<QuarantineRecord> {
    const quarentineRecord =
      await this.quarentineRecordRepository.findById(quarentineRecordId);
    if (!quarentineRecord) {
      throw new NotFoundException({
        message: 'Nutrição não encontrada',
      });
    }

    const updated = await this.quarentineRecordRepository.update(
      quarentineRecordId,
      quarentineRecordDTO,
    );
    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar registro de medidas no banco de dados',
      });
    }
    return updated;
  }
}
