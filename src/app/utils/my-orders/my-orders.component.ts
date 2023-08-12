import { Component } from '@angular/core';
import { Order } from 'src/app/model/Order';
import { OrderService } from 'src/app/service/order.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  myPendingOrders: Order[] = [];
  returnCode = 0;
  ordered: Order | undefined; // had to create an to avoid bootstrap error

  constructor(private orderService: OrderService,
              private dialog      : MatDialog) {
    this.orderService.getMyPendingOrders().subscribe({
      next: (orders) => {
        this.myPendingOrders = orders;
      },
      error: (error) => {
        if (error.status === 404) 
          this.returnCode = 404;
        else 
          this.returnCode = 500;
      }
    });
  }

  getOrderById(id?: number): void {
    this.ordered = this.myPendingOrders.find((order) => order.id === id);
  }

  openConfirmationModal(order: Order) {

  }

  openRemovalDialog(order: Order) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '400px',
      data: { 
              title: "Annuler",
              content: "Êtes-vous sûr de vouloir anuller votre commande ?",
              order: order,
              action: "remove"
            },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "remove") {
        this.deleteOrder(order);
        alert("Commande annulé");
      }
    });
  }

  deleteOrder(order: Order) {
    if (order.id) {
      this.orderService.deleteOrder(order.id);
      this.myPendingOrders = this.myPendingOrders.filter((o) => order.id === o.id);
      console.log("delete Order" + order.id)
    }
    console.log(this.myPendingOrders);
  }

}
