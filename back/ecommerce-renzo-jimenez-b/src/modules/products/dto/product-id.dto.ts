import { IsUUID } from 'class-validator';

export class ProductIdDto {
  @IsUUID()
  id: string;
}

// a POST /orders request receives as body an object with 2 properties:
// a userID and an array of products IDs
// this DTO is used in the PublicUserDto to instantiate each productId object
