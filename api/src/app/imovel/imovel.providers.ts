import { DataSource } from 'typeorm';
import { Imovel } from './entities/imovel.entity';

export const imovelProvidrs = [
  {
    provide: 'IMOVEL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Imovel),
    inject: ['DATABASE_CONNECTION'],
  },
];
