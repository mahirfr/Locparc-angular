import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/Order';
import { OrderService } from 'src/app/service/order.service';
import { OrderItems } from 'src/app/model/OrderItems';



@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  orders: Order[] = [];
  orderedItems: OrderItems[] = [];
  ordered: Order = new Order();

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getPendingOrders().subscribe(
      orders => this.orders = orders
    ) 
  }

  getOrder(id?: number): void {
    this.orderService.getOrderById(id).subscribe(
      order => this.ordered = order
    )
  }

  
}
