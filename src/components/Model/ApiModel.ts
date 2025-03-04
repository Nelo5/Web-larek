import { ApiListResponse, Api } from '../base/api'
import { IOrder, IOrderResult, IProductItem } from '../../types';

export interface IApiModel {
  cdn: string;
  items: IProductItem[];
  getListProductCard: () => Promise<IProductItem[]>;
  postOrderLot: (order: IOrder) => Promise<IOrderResult>;
}

export class ApiModel extends Api implements IApiModel{
  cdn: string;
  items: IProductItem[];
  getListProductCard: () => Promise<IProductItem[]>;
  postOrderLot: (order: IOrder) => Promise<IOrderResult>;
}