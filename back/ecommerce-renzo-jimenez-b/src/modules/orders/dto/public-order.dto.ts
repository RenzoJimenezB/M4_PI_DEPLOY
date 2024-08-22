import { Transform } from 'class-transformer';

export class PublicOrderDto {
  id: string;

  @Transform(({ value }) => {
    const date = value instanceof Date ? value : new Date(value);
    return date.toLocaleDateString('es', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  })
  date: string;
}
