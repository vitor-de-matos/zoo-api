import { UpdateTransferRecordsDTO } from 'src/transfer-records/models/dtos/update-transfer-records.dto';
import { ITransferRecordsRepo } from 'src/transfer-records/models/interface/transfer-records.interface';
import { TransferRecords } from 'src/transfer-records/models/entity/transfer-records.entity';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdateTransferRecordsUseCase {
  constructor(
    @Inject('ITransferRecordsRepo')
    private readonly transferRecordRepository: ITransferRecordsRepo,
  ) {}

  async update(
    transferRecordsId: number,
    transferRecordsDTO: UpdateTransferRecordsDTO,
  ): Promise<TransferRecords> {
    const transferRecord =
      await this.transferRecordRepository.findById(transferRecordsId);
    if (!transferRecord) {
      throw new NotFoundException({
        message: 'Registro de transferencias não encontrado',
      });
    }

    const updated = await this.transferRecordRepository.update(
      transferRecordsId,
      transferRecordsDTO,
    );
    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar registro de medidas no banco de dados',
      });
    }
    return updated;
  }
}
