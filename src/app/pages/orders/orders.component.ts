import { Component } from '@angular/core';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  connectedUser: User | null = null;
	isAdmin: boolean = false;

  constructor(private loginService: LoginService) {
    this.loginService._connectedUser.subscribe(
			(user) => {
				this.connectedUser = user,
				this.isAdmin = user?.role?.name == "ROLE_ADMIN"
			}
		)
  }

}
