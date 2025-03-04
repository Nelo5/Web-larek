import { IProductItem } from "../../types";
import { IEvents } from "../base/events";

export interface ICatalogModel {
  productCards: IProductItem[];
  selectedСard: IProductItem;
  openPreview(item: IProductItem): void;
}

export class CatalogModel implements ICatalogModel {
  productCards: IProductItem[];
  selectedСard: IProductItem;
  openPreview(item: IProductItem): void {
    throw new Error("Method not implemented.");
  }

}