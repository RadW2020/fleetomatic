import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const POSTGRES_CONN: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity.{ts,js}'],
  synchronize: true,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  logging: process.env.NODE_ENV === 'production' ? false : true,
};
