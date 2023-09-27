import { DataSource } from 'typeorm';
import { Imovel } from '../imovel/entities/imovel.entity';
import { Comodo } from '../imovel/entities/comodo.entity';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3307,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities: [Imovel, Comodo],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
