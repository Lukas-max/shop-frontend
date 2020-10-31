import { Component, OnInit } from '@angular/core';
import { ClientOrder } from '../../../products/model/clientOrder';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-user-orders',
  templateUrl: './single-user-orders.component.html',
  styleUrls: ['./single-user-orders.component.css']
})
export class SingleUserOrdersComponent implements OnInit {
  orders: ClientOrder[];
  page: number;
  size: number;
  totalElements: number;

  constructor(
    private userService: UsersService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.page = 1;
    this.size = 20;
    this.activatedRoute.paramMap.subscribe(() => {
      this.getUserOrders();
    });
  }

  public getUserOrders(){
    const user: boolean = this.activatedRoute.snapshot.paramMap.has('user_id');

    if (user){
      const orderId: number = +this.activatedRoute.snapshot.paramMap.get('user_id');
      this.userService.fetchUserOrders(this.page - 1, this.size, orderId)
        .subscribe(this.processResponse());
    }
  }

  private processResponse(){
    return userOrders => {
      this.totalElements = userOrders.totalElements;
      this.orders = userOrders.content;
    };
  }
}