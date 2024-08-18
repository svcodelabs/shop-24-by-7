import { ReactElement } from "react";

export interface CategoryModel {
  slug: string;
  name: string;
  url: string;
}

export interface CategoryColorModel {
  slug: string;
  name: string;
  url: string;
  bgColor: string;
  bgToColor: string;
  borderColor: string;
  icon?: ReactElement;
  iconColor?: string;
}

export interface ShippingStockResponseModel {
  products: ShippingStockStatusModel[];
  limit: number;
  skip: number;
  total: number;
}

export interface ShippingStockStatusModel {
  id: number;
  shippingInformation: string;
  availabilityStatus: string;
}