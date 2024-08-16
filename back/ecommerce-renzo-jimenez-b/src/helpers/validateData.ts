import { BadRequestException } from '@nestjs/common';
import { validateOrReject, ValidationError } from 'class-validator';
import { AuthDto } from 'src/modules/auth/AuthDto';
import { CreateProductDto } from 'src/modules/products/dto/CreateProductDto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

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
