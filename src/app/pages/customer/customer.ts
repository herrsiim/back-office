import { Component } from '@angular/core';
import { CustomerForm } from "../../components/customer-form/customer-form";

@Component({
  selector: 'app-customer',
  imports: [CustomerForm],
  templateUrl: './customer.html',
  styleUrl: './customer.scss'
})
export class Customer {

}
