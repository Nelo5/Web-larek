import { CardView } from "./CardView";
import { IProductItem } from "../../types";
import { IEvents } from "../base/events";

export interface ICardModalView {
  text: HTMLElement;
  button: HTMLButtonElement;
  render(data: IProductItem): HTMLElement;
  setButtonState(message: string):void;
}

export class CardModalView extends CardView implements ICardModalView {
  text: HTMLElement;
  button: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents, callback?: (event:MouseEvent) => void) {
    super(template, events, callback);
    this.text = this.cardElement.querySelector('.card__text');
    this.button = this.cardElement.querySelector('.card__button');
    this.button.addEventListener('click', () => { this.events.emit('card:addBasket') });
  }

  render(data: IProductItem): HTMLElement {
    super.render(data);
    this.text.textContent = data.description;
    return this.cardElement;
  }

  protected getPriceText(value: number | null) {
    return value === null ? "Бесценно" : `${value} синапсов`;
  }

  setButtonState(text: "Купить" | "В корзине" | "Не продаётся"): void {
    this.button.textContent = text;
    switch(text) {
      case "Купить": {
        this.button.disabled = false;
        break;
      }
      case "В корзине": {
        this.button.disabled = true;
        break;
      }
      case "Не продаётся": {
        this.button.disabled = true;
        break;
      }
    }
  }
}