import { Card } from "./Card";
import { IProductItem } from "../../types";
import { IEvents } from "../base/events";

export interface ICardPreview {
  text: HTMLElement;
  button: HTMLElement;
  render(data: IProductItem): HTMLElement;
}

export class CardPreview extends Card implements ICardPreview {
  text: HTMLElement;
  button: HTMLElement;
  renderPriceless(data:IProductItem):void{}
}