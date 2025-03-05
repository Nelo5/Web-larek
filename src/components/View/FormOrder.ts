import { IEvents } from "../base/events";

export interface IOrder {
  formOrder: HTMLFormElement;
  buttons: HTMLButtonElement[];
  paymentSelection: String;
  errors: HTMLElement;
  render(): HTMLElement;
}

export class Order implements IOrder {
  formOrder: HTMLFormElement;
  buttons: HTMLButtonElement[];
  paymentSelection: String;
  errors: HTMLElement;
  render(): HTMLElement {
    throw new Error("Method not implemented.");
  }
  
}