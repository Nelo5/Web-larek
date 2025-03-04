import { IProductItem } from "../../types";

export interface IBasketModel {
  basketProducts: IProductItem[];
  getCounter: () => number;
  getSumAllProducts: () => number;
  addSelectedСard(data: IProductItem): void;
  deleteSelectedCard(item: IProductItem): void;
  clearBasket(): void
}

export class BasketModel implements IBasketModel {
  basketProducts: IProductItem[];
  getCounter: () => number;
  getSumAllProducts: () => number;
  addSelectedСard(data: IProductItem): void {
    throw new Error("Method not implemented.");
  }
  deleteSelectedCard(item: IProductItem): void {
    throw new Error("Method not implemented.");
  }
  clearBasket(): void {
    throw new Error("Method not implemented.");
  }
}