import { IEvents } from "../base/events";

export interface IFormContactsView {
  formContacts: HTMLFormElement;
  inputs: HTMLInputElement[];
  button: HTMLButtonElement;
  errors: HTMLElement;
  render(): HTMLElement;
}

export class FormContactsView implements IFormContactsView {
  formContacts: HTMLFormElement;
  inputs: HTMLInputElement[];
  button: HTMLButtonElement;
  errors: HTMLElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    this.formContacts = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
    this.inputs = Array.from(this.formContacts.querySelectorAll('.form__input'));
    this.button = this.formContacts.querySelector('.button');
    this.errors = this.formContacts.querySelector('.form__errors');

    this.inputs.forEach(item => {
      item.addEventListener('input', (event) => {
        const target = event.target as HTMLInputElement;
        const field = target.name;
        const value = target.value;
        this.events.emit(`contacts:changeInput`, { field, value });
      })
    })

    this.formContacts.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.events.emit('success:open');
    });
  }

  set valid(value: boolean) {
    this.button.disabled = !value;
  }

  render(): HTMLElement {
    return this.formContacts
  }
}