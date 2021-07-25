import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientCartService {
  private clientCart: Array<any>[] = [];

  constructor() { }

  addToCart(packageType: any): void {
    this.clientCart.push(packageType);
  }

  getClientCart(): Array<any>[] {
    return this.clientCart;
  }

  clearCart(): void {
    this.clientCart = [];
  }
}
