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
  ordered: Order | null = null;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(
      orders => this.orders = orders
    )

    // this.orders.forEach(order => {
    //   order.orderedItems.forEach(items => {
    //     this.orderedItems = items
    //   })
    // });
  }

  getOrder(id: number): void {
    this.orderService.getOrderById(id).subscribe(
      order => this.ordered = order
    )
  }

  
}
