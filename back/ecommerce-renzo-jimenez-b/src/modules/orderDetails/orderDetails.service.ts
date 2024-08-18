import { Injectable } from '@nestjs/common';
import { OrderDetailsRepository } from './orderDetails.repository';

@Injectable()
export class OrderDetailsService {
  constructor(private orderDetailsRepository: OrderDetailsRepository) {}
}
