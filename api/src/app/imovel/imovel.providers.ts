import { DataSource } from 'typeorm';
import { Imovel } from './entities/imovel.entity';
import { Comodo } from './entities/comodo.entity';

export const imovelProvidrs = [
  {
    provide: 'IMOVEL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Imovel),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'COMODO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Comodo),
    inject: ['DATABASE_CONNECTION'],
  },
];
