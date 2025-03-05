import { IProductItem } from "../../types";
import { IEvents } from "../base/events";

export interface IBasketItem {
  	basketItem: HTMLElement;
	index:HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	button: HTMLButtonElement;
	render(data: IProductItem, ind: number): HTMLElement;
}

export class BasketItem implements IBasketItem {
	basketItem: HTMLElement;
	index: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	button: HTMLButtonElement;
	render(data: IProductItem, ind: number): HTMLElement {
		throw new Error("Method not implemented.");
	}
}