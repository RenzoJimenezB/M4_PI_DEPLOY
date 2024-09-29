import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/logger.middleware';
import { CategoriesService } from './modules/categories/categories.service';
import { ProductsService } from './modules/products/products.service';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Retrieve instances of the services from the Dependency Injection (DI) container
  const categoriesService = app.get(CategoriesService);
  const productsService = app.get(ProductsService);

  // Call methods on the retrieved services
  await categoriesService.addCategories();
  await productsService.addProducts();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('M4 Ecommerce API')
    .setDescription('M4 API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.use(loggerGlobal);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
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
