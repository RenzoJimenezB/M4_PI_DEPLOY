import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/logger.middleware';
import { CategoriesService } from './modules/categories/categories.service';
import { ProductsService } from './modules/products/products.service';
import { preloadedCategories, preloadedProducts } from './helpers/preloadData';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const categoriesService = app.get(CategoriesService);
  const productsService = app.get(ProductsService);

  await categoriesService.seedCategories(preloadedCategories);
  await productsService.seedProducts(preloadedProducts);

  app.use(loggerGlobal);
  await app.listen(3000);
}
bootstrap();
