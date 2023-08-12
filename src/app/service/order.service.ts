import { Injectable                          } from '@angular/core'                ;
import { HttpClient                          } from '@angular/common/http'         ;
import { Observable , catchError, retry, throwError } from 'rxjs'                         ;
import { Order                               } from '../model/Order'               ;
import { environment                         } from 'src/environments/environment' ;
import { Item } from '../model/Item';
import { User } from '../model/User';
import { Address } from '../model/Address';
import { OrderItems } from '../model/OrderItems';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL = environment.serverUrl;

  constructor(private http: HttpClient,
              private datePipe: DatePipe) { }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.URL + "/api/orders/")
      .pipe(
        catchError(error => {
          return throwError(() => new Error('Une erreur est survenue, ressayez plus tard'));
        })
      );
  }

  // TODO: get pending orders
  getPendingOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.URL + "/api/orders/pending");
  }

  getMyPendingOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.URL}/api/orders/get-my-pending`);
  }

  getMyOrderHistory(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.URL}/api/orders/get-my-history`);
  }

  getUserHistory(email: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.URL}/api/orders/admin/get-user-history?email=${email}`);
  }

  // TODO: get order by id 
  getOrderById(id?: number): Observable<Order> {
    return this.http.get<Order>(`${this.URL}/api/orders/${id}`)
      .pipe(
        catchError(error => {
          console.log(error);
          return throwError(() => new Error('Une erreur est survenue, ressayez plus tard'));
        })
      );
  }

  approveOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.URL}/api/orders/approve-order`, order)
  }

  refuseOrder(order: Order, refusalMotive: string): Observable<Order> {
    return this.http.put<Order>(`${this.URL}/api/orders/refuse-order?motive=${refusalMotive}`, order) 
  }
      
  sendOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.URL}/api/orders/save-order`, order);
  }

  persistOrder(order: Order) {
    return this.http.post<Order>(`${this.URL}/api/orders/persist`, order);
  }

  deleteOrder(id: number) {
    return this.http.delete<Order>(`${this.URL}/api/orders/delete/${id}`)
  }


  buildOrder(order: Order,
            items: Item[], 
            user: User, 
            address: Address,
            motive: string,
            ): Order 
  {
    let orderedItems: OrderItems[] = []; 
    items.forEach((item) => {
      let orderedItem: OrderItems = new OrderItems();
      orderedItem.itemId = item.id;
      orderedItem.orderId = order.id;
      orderedItems.push(orderedItem);
      console.log(orderedItem)
    })
    order.orderedItems = orderedItems;
    order.user = user;
    order.address = address;
    
    order.event = motive;
    console.log(order)
    return order;
  }

  removeOrder(orders: Order[], ordered: Order) {
    orders.forEach((o, index) => {
      if (o.id === ordered.id)
        orders.splice(index, 1);
    })
  }

}
