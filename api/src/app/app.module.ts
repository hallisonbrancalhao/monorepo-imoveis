import { Module } from '@nestjs/common';

import { ImovelModule } from './imovel/imovel.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot(), ImovelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
