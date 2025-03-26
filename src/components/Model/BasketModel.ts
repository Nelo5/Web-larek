import { IProductItem } from "../../types";

export interface IBasketModel {
  getCounter: () => number;
  getSum: () => number;
  addSelectedСard(data: IProductItem): void;
  deleteSelectedCard(item: IProductItem): void;
  clearBasket(): void
  hasCard(item:IProductItem):boolean;
}

export class BasketModel implements IBasketModel {
  protected _basketProducts: Set<IProductItem>;
  constructor() {
    this._basketProducts = new Set();
  }
  set basketProducts(data: IProductItem[]) {
    this._basketProducts = new Set(data);
  }

  get basketProducts() {
    return Array.from(this._basketProducts);
  }
  getCounter(): number{
    return this._basketProducts.size;
  }
  getSum(): number{
    return this.basketProducts.reduce((accumulator, product) => accumulator + product.price, 0);
  }

  hasCard(item: IProductItem): boolean {
    return this._basketProducts.has(item);
  }

  addSelectedСard(data: IProductItem): void {
    this._basketProducts.add(data);
  }

  deleteSelectedCard(item: IProductItem): void {
    this._basketProducts.delete(item);
  }

  clearBasket():void {
    this._basketProducts.clear();
  }
}