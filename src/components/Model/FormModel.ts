import { IEvents } from '../base/events';
import { IOrder,FormErrors } from '../../types/index'

export interface IFormModel {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
  setOrderData(field: string, value: string): void
  validateOrderData(field: string): boolean;
  getOrder(): IOrder;
}

export class FormModel implements IFormModel {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
  formErrors: FormErrors = {};
  setOrderData(field: string, value: string): void {
    throw new Error('Method not implemented.');
  }
  validateOrderData(field: string): boolean {
    throw new Error('Method not implemented.');
  }
  getOrder(): IOrder {
    throw new Error('Method not implemented.');
  }
}