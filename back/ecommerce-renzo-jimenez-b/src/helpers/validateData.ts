import { BadRequestException } from '@nestjs/common';
import { validateOrReject, ValidationError } from 'class-validator';
import { AuthDto } from 'src/modules/auth/dto/auth.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { CreateProductDto } from 'src/modules/products/dto/create-product.dto';

type ValidationInput = CreateUserDto | CreateProductDto | AuthDto;

export async function validateData(data: ValidationInput) {
  try {
    await validateOrReject(data);
  } catch (errors) {
    console.log('Validation errors:', errors);

    if (
      Array.isArray(errors) &&
      errors.every((error) => error instanceof ValidationError)
    ) {
      const constraints = errors
        .map((error) => Object.values(error.constraints))
        .flat();
      throw new BadRequestException(constraints);
    }
    throw new BadRequestException('Validation failed');
  }
}
