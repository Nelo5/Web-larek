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

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getListProductCard(): Promise<IProductItem[]> {
    return this.get('/product').then((data: ApiListResponse<IProductItem>) =>
      data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image,
      }))
    );
  }
  
  postOrderLot(order: IOrder): Promise<IOrderResult> {
      return this.post(`/order`, order).then((data: IOrderResult) => data);
  }
}
