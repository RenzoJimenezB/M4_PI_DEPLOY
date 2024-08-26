import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/logger.middleware';
import { CategoriesService } from './modules/categories/categories.service';
import { ProductsService } from './modules/products/products.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Retrieve instances of the services from the Dependency Injection (DI) container
  const categoriesService = app.get(CategoriesService);
  const productsService = app.get(ProductsService);

  // Call methods on the retrieved services
  await categoriesService.addCategories();
  await productsService.addProducts();

  app.use(loggerGlobal);
  await app.listen(3000);
}
bootstrap();
