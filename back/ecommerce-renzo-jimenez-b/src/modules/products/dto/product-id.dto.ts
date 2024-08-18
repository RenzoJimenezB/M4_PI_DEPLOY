import { IsUUID } from 'class-validator';

export class ProductIdDto {
  @IsUUID()
  id: string;
}
