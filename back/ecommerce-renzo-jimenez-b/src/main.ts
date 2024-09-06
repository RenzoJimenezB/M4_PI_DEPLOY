import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/logger.middleware';
import { CategoriesService } from './modules/categories/categories.service';
import { ProductsService } from './modules/products/products.service';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Retrieve instances of the services from the Dependency Injection (DI) container
  const categoriesService = app.get(CategoriesService);
  const productsService = app.get(ProductsService);

  // Call methods on the retrieved services
  await categoriesService.addCategories();
  await productsService.addProducts();

  app.use(loggerGlobal);
  app.useGlobalPipes(
    new ValidationPipe({
      // exceptionFactory: (errors) => {
      //   const cleanErrors = errors.map((error) => {
      //     return {
      //       property: error.property,
      //       constraint: error.constraints,
      //     };
      //   });
      //   return new BadRequestException({
      //     errors: cleanErrors,
      //   });
      // },
    }),
  );
  await app.listen(3000);
}
bootstrap();
