import { Order } from 'src/entities/orders.entity';

export class OrderWithDetailsDto {
  order: Order;
  orderDetailId: string;
  totalPrice: number;
}
