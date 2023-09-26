import { Module } from '@nestjs/common';
import { ImovelService } from './imovel.service';
import { ImovelController } from './imovel.controller';
import { DatabaseModule } from '../database/database.module';
import { imovelProvidrs } from './imovel.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ImovelController],
  providers: [...imovelProvidrs, ImovelService],
  exports: [...imovelProvidrs, ImovelService],
})
export class ImovelModule {}
