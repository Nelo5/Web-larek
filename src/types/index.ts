export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IOrder{
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

// export interface IOrder extends IOrderForm{
//   items: string[];
// }

export interface IOrderResult {
  id: string;
  total: number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;