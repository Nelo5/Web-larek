import { IProductItem } from "../../types";
import { IEvents } from "../base/events";

export interface IBasketItemView {
  	basketItem: HTMLElement;
	index:HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	button: HTMLButtonElement;
	render(data: IProductItem, ind: number): HTMLElement;
}

export class BasketItemView implements IBasketItemView {
	basketItem: HTMLElement;
	index: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	button: HTMLButtonElement;
	constructor (template: HTMLTemplateElement, protected events: IEvents, callback?: (event:MouseEvent) => void) {
		this.basketItem = template.content.querySelector('.basket__item').cloneNode(true) as HTMLElement;
		this.index = this.basketItem.querySelector('.basket__item-index');
		this.title = this.basketItem.querySelector('.card__title');
		this.price = this.basketItem.querySelector('.card__price');
		this.button = this.basketItem.querySelector('.basket__item-delete');
		if (callback) {
			this.button.addEventListener('click', callback);
		}
	}
	
	protected setPrice(value: number | null) {
		if (value === null) {
	  		return 'Бесценно'
		}
		return String(value) + ' синапсов'
	}
	
	render(data: IProductItem, item: number) {
		this.index.textContent = String(item);
		this.title.textContent = data.title;
		this.price.textContent = this.setPrice(data.price);
		return this.basketItem;
	}
}