import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IQuarentineRecordRepo } from 'src/quarentine-record/models/interface/quarentine-repo.interface';

@Injectable()
export class DeleteQuarentineRecordUseCase {
  constructor(
    @Inject('IQuarentineRecordRepo')
    private readonly nutritionRepository: IQuarentineRecordRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const quarentineRecordRecord = await this.nutritionRepository.findById(id);

    if (!quarentineRecordRecord) {
      throw new NotFoundException({
        message: 'Registro de quarentena não encontrado',
      });
    }

    await this.nutritionRepository.delete(id);
  }
}
