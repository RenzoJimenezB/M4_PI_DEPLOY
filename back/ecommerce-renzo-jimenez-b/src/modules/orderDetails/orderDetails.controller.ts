import { Controller } from '@nestjs/common';
import { OrderDetailsService } from './orderDetails.service';

@Controller()
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}
}
