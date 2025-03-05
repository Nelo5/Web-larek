import { IEvents } from "../base/events";

export interface IContacts {
  formContacts: HTMLFormElement;
  inputs: HTMLInputElement[];
  button: HTMLButtonElement;
  errors: HTMLElement;
  render(): HTMLElement;
}

export class Contacts implements IContacts {
  formContacts: HTMLFormElement;
  inputs: HTMLInputElement[];
  button: HTMLButtonElement;
  errors: HTMLElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
  }
  render(): HTMLElement {
    throw new Error("Method not implemented.");
  }
}
