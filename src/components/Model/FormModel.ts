import { IEvents } from "../base/events";
import { FormErrors, IOrder } from "../../types/index";

export interface IFormModel extends IOrder {
	setOrderData(field: string, value: string): void;
	validateOrder(field: string): boolean;
	getOrderData(): IOrder;
}

export class FormModel implements IFormModel {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
	formErrors: FormErrors = {};

	constructor(protected events: IEvents) {
		this.payment = "";
		this.email = "";
		this.phone = "";
		this.address = "";
		this.total = 0;
		this.items = [];
	}

	setOrderData(field: string, value: string) {
		if (field === "address") {
			this.address = value;
		} else if (field === "email") {
			this.email = value;
		} else if (field === "phone") {
			this.phone = value;
		}

		if (this.validateOrder(field)) {
			this.events.emit("order:ready", this.getOrderData());
		}
	}

	validateOrder(field: string) {
		const errors: FormErrors = {};

		if (!this.address) {
			errors.address = "Необходимо указать адрес";
		} else if (!this.payment) {
			errors.payment = "Выберите способ оплаты";
		} else if (!this.email) {
			errors.email = "Необходимо указать email";
		} else if (!this.phone) {
			errors.phone = "Необходимо указать телефон";
		}

		this.formErrors = errors;

        if (field == "address" || field == "payment") {
            this.events.emit("formErrors:shipping", this.formErrors);
        } else if (field == "email" || field == "phone") {
            this.events.emit("formErrors:contacts", this.formErrors);
        }
		return Object.keys(errors).length === 0;
	}

	getOrderData() {
		return {
			payment: this.payment,
			email: this.email,
			phone: this.phone,
			address: this.address,
			total: this.total,
			items: this.items,
		};
	}
}


// import { IEvents } from '../base/events';
// import { IOrder,FormErrors } from '../../types/index'

// export interface IFormModel {
//   payment: string;
//   email: string;
//   phone: string;
//   address: string;
//   total: number;
//   items: string[];
//   setOrderData(field: string, value: string): void
//   validateOrderData(field: string): boolean;
//   getOrder(): IOrder;
// }

// export class FormModel implements IFormModel {
//   payment: string;
//   email: string;
//   phone: string;
//   address: string;
//   total: number;
//   items: string[];
//   formErrors: FormErrors = {};

//   constructor(protected events: IEvents) {
//     this.payment = '';
//     this.email = '';
//     this.phone = '';
//     this.address = '';
//     this.total = 0;
//     this.items = [];
//   }

//   setOrderData(field: string, value: string): void {
//     if (field === 'address') {
//       this.address = value;
//     }
//     else if (field === 'email') {
//       this.email = value;
//     } 
//     else if (field === 'phone') {
//       this.phone = value;
//     }

//     if (this.validateOrderData(field)) {
//       this.events.emit('order:ready', this.getOrder());
//     }
//   }

//   validateOrderData(field: string): boolean {
//     const errors: FormErrors = {};
//     if (!this.email) {
//       errors.email = 'Необходимо указать email'
//     }
//     else if (!this.phone) {
//       errors.phone = 'Необходимо указать телефон'
//     }
//     else if (!this.address) {
//       errors.address = 'Необходимо указать адрес'
//     } 
//     else if (!this.payment) {
//       errors.payment = 'Выберите способ оплаты'
//     }

    
//     this.formErrors = errors;
//     if (field == "email" || field == "phone"){
//       this.events.emit('formErrors:change', this.formErrors);
//     }
//     else if (field == "address" || field == "payment"){
//       this.events.emit('formErrors:shipping', this.formErrors);
//     }
//     return Object.keys(errors).length === 0;
//   }

//   getOrder(): IOrder {
//     return {
//       payment: this.payment,
//       email: this.email,
//       phone: this.phone,
//       address: this.address,
//       total: this.total,
//       items: this.items,
//     }
//   }
// }