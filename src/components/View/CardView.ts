import { IProductItem } from "../../types";
import { IEvents } from "../base/events";

export interface ICardView {
  cardElement: HTMLElement;
  cardTitle: HTMLElement;
  cardImage: HTMLImageElement;
  cardPrice: HTMLElement;
  render(data: IProductItem): HTMLElement;
}

export class CardView implements ICardView {
  cardElement: HTMLElement;
  _cardCategory: HTMLElement;
  cardTitle: HTMLElement;
  cardImage: HTMLImageElement;
  cardPrice: HTMLElement;
  colors = <Record<string, string>>{
    "дополнительное": "additional",
    "софт-скил": "soft",
    "кнопка": "button",
    "хард-скил": "hard",
    "другое": "other",
  }

  constructor(template: HTMLTemplateElement, protected events: IEvents, callback?: (event:MouseEvent) => void) {
    this.cardElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
    this._cardCategory = this.cardElement.querySelector('.card__category');
    this.cardTitle = this.cardElement.querySelector('.card__title');
    this.cardImage = this.cardElement.querySelector('.card__image');
    this.cardPrice = this.cardElement.querySelector('.card__price');
    if (callback) {
      this.cardElement.addEventListener('click', callback);
    }
  }

  setText(element: HTMLElement, value: unknown): string {
    if (element) {
      return element.textContent = String(value);
    }
  }

  set cardCategory(value: string) {
    this.setText(this._cardCategory, value);
    this._cardCategory.className = `card__category card__category_${this.colors[value]}`
  }

  protected setPrice(value: number | null): string {
    if (value === null) {
      return 'Бесценно'
    }
    return String(value) + ' синапсов'
  }

  render(data: IProductItem): HTMLElement {
    this._cardCategory.textContent = data.category;
    this.cardCategory = data.category;
    this.cardTitle.textContent = data.title;
    this.cardImage.src = data.image;
    this.cardImage.alt = this.cardTitle.textContent;
    this.cardPrice.textContent = this.setPrice(data.price);
    return this.cardElement;
  }

}











