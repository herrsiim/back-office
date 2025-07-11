import { Component } from '@angular/core';
import { CustomerForm } from "../../components/customer-form/customer-form";
import { Card } from "../../components/card/card";

@Component({
  selector: 'app-customer',
  imports: [CustomerForm, Card],
  templateUrl: './customer.html',
  styleUrl: './customer.scss'
})
export class Customer {

}
