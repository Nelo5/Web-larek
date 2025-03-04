import { IEvents } from "../base/events";

export interface IContacts {
  formContacts: HTMLFormElement;
  inputs: HTMLInputElement[];
  buttonSubmit: HTMLButtonElement;
  formErrors: HTMLElement;
  render(): HTMLElement;
}

export class Contacts implements IContacts {
  formContacts: HTMLFormElement;
  inputs: HTMLInputElement[];
  buttonSubmit: HTMLButtonElement;
  formErrors: HTMLElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
  }
  render(): HTMLElement {
    throw new Error("Method not implemented.");
  }
}
