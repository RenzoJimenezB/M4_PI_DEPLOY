import { Transform } from 'class-transformer';

export class PublicOrderDto {
  id: string;

  @Transform(({ value }) =>
    value.toLocaleDateString('es', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
  )
  date: string;
}
