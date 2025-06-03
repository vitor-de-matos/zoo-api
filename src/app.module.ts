import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './shared/config/config';
import { SharedModule } from './shared/shared.module';
import { AnimalModule } from './animal/animal.module';
import { FeedingScheduleModule } from './feeding-schedule/feeding-schedule.module';
import { HabitatModule } from './habitat/habitat.module';
import { KeeperModule } from './keeper/keeper.module';
import { MeasurementRecordModule } from './measurement-record/measurement-record.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { NutritionModule } from './nutrition/nutrition.module';
import { QuarentineRecordModule } from './quarentine-record/quarentine-record.module';
import { SpeciesModule } from './species/species.module';
import { TransferRecordsModule } from './transfer-records/transfer-records.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: [__dirname + '/../.env'],
    }),
    SharedModule,
    AnimalModule,
    FeedingScheduleModule,
    HabitatModule,
    KeeperModule,
    MeasurementRecordModule,
    MedicalRecordModule,
    NutritionModule,
    QuarentineRecordModule,
    SpeciesModule,
    TransferRecordsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
