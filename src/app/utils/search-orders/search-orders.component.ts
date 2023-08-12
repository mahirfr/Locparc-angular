import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Order } from 'src/app/model/Order';
import { OrderService } from 'src/app/service/order.service';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-search-orders',
  templateUrl: './search-orders.component.html',
  styleUrls: ['./search-orders.component.css']
})
export class SearchOrdersComponent {

  searchQuery = "";
  userOrders: Order[] = [];
  order: Order | undefined;
  searchFormGroup: FormGroup;
  errorCode = 0;

  constructor(private orderService: OrderService,
              private formBuilder : FormBuilder,
              private dialog      : MatDialog) 
  {
    this.searchFormGroup = this.formBuilder.group({
      searchQuery: [""]
    });
  }

  onSubmitSearchFormGroup() {
    this.searchQuery = this.searchFormGroup.get('searchQuery')?.value;
    this.userOrders = [];

    this.orderService.getUserHistory(this.searchQuery).subscribe(
      {
        next: (orders) => {
          this.userOrders = orders;
        },
        error: (error) => {
          if (error.status === 404)
            this.errorCode = 404
          else 
            this.errorCode = 500
        }     
    })
  }

  getOrderById(id: number) {
    this.order = this.userOrders.find((order) => order.id === id);
  }

  openRemovalDialog(order: Order) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '400px',
      data: { 
              title: "Supprimer",
              content: "Êtes-vous sûr de vouloir supprimer la commande ?",
              order: order,
              action: "remove"
            },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === "remove") {
        console.log(order)  
        this.deleteOrder(order);
        alert("Commande supprimé");
      }
    });
  }

  deleteOrder(order: Order) {
    if (order.id) {
      this.orderService.deleteOrder(order.id).subscribe();
      this.userOrders = this.userOrders.filter((o) => order.id != o.id);
      console.log("delete Order" + order.id)
    }
    console.log(this.userOrders);
  }
}
