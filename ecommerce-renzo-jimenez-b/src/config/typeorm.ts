import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({
  path: '.env.development',
});

const config = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true, // Disable automatic schema synchronization,
  // dropSchema: true,
  // logging: true,
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
