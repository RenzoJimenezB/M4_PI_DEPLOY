import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { User } from 'src/entities/users.entity';
import { Order } from 'src/entities/orders.entity';
import { Product } from 'src/entities/products.entity';
import { Category } from 'src/entities/categories.entity';
import { OrderDetail } from 'src/entities/orderDetails.entity';

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
  // dropSchema: true,
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  // entities: [User, Product, Order, OrderDetail, Category],
  // entities: ['dist/**/*.entity{.ts,.js'],
  // migrations: ['dist/migrations/*{.ts,.js'],
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
