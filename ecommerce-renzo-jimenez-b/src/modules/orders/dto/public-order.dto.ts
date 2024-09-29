import { Transform } from 'class-transformer';

export class PublicOrderDto {
  /**
   * UUID
   * @example 4eecc298-a41f-4a56-9d61-2b1c1390f976
   */
  id: string;

  /**
   * Value of type timetamptz is formatted => DD/MM/YYYY
   * @example 01/06/1999
   */
  @Transform(({ value }) => {
    const date = value instanceof Date ? value : new Date(value);
    // UTC => local time zone of the system running the code (client)
    // a 'timestamp' would be interpreted as a date in the system's local time zone without any conversion
    return date.toLocaleDateString('es', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      // timeZone: 'UTC',
    });
  })
  date: string;
}
